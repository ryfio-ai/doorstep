// src/scripts/seed-mock-users.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually
const envPath = path.resolve(__dirname, '../../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.+)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase URL or Service Role Key in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const mockUsers = [
  { email: 'student@thiranoli.com', password: 'student123', role: 'student', full_name: 'Arjun Student', isParent: false },
  { email: 'trainer@thiranoli.com', password: 'trainer123', role: 'trainer', full_name: 'Ravi Kumar', isParent: false },
  { email: 'admin@thiranoli.com', password: 'admin123', role: 'admin', full_name: 'ThiranOli Admin', isParent: false },
  { email: 'parent@thiranoli.com', password: 'parent123', role: 'student', full_name: 'Sangeetha Parent', isParent: true },
];

async function seed() {
  console.log('🚀 Starting mock user seeding...');

  for (const user of mockUsers) {
    console.log(`\nCreating ${user.role}: ${user.email}...`);

    // 1. Create Auth User
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log(`User ${user.email} already exists in Auth.`);
        // Try to get the user ID
        const { data: listData } = await supabase.auth.admin.listUsers();
        const existingUser = listData.users.find(u => u.email === user.email);
        if (existingUser) {
          await syncPublicProfile(existingUser.id, user);
        }
      } else {
        console.error(`Error creating auth user ${user.email}:`, authError.message);
      }
      continue;
    }

    if (authData.user) {
      console.log(`Auth user created: ${authData.user.id}`);
      await syncPublicProfile(authData.user.id, user);
    }
  }

  console.log('\n✅ Seeding complete!');
}

async function syncPublicProfile(userId, user) {
  // 2. Sync to public.users
  const { error: userError } = await supabase
    .from('users')
    .upsert({
      id: userId,
      email: user.email,
      role: user.role,
      full_name: user.full_name,
      is_verified: true,
      onboarding_complete: true
    });

  if (userError) {
    console.error(`Error syncing public.users for ${user.email}:`, userError.message);
    return;
  }
  console.log(`Public user profile synced.`);

  // 3. Create role-specific profiles
  if (user.role === 'student') {
    const { error: studentError } = await supabase
      .from('student_profiles')
      .upsert({
        user_id: userId,
        is_parent: user.isParent,
        grade: '10th',
        school_board: 'CBSE'
      });
    if (studentError) console.error(`Error creating student profile:`, studentError.message);
    else console.log(`Student profile created (isParent: ${user.isParent}).`);
  } else if (user.role === 'trainer') {
    const { error: trainerError } = await supabase
      .from('trainer_profiles')
      .upsert({
        user_id: userId,
        verified: true,
        is_active: true,
        experience_years: 5,
        subjects: ['Mathematics', 'Python']
      });
    if (trainerError) console.error(`Error creating trainer profile:`, trainerError.message);
    else console.log(`Trainer profile created.`);
  }
}

seed();
