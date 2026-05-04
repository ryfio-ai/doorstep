-- ============================================================
-- EDUDOOR COMPLETE DATABASE SEED
-- Cities, Localities, Course Catalog, Plans, and Coupons
-- ============================================================

CREATE TABLE IF NOT EXISTS public.cities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  code        TEXT NOT NULL UNIQUE,
  state       TEXT NOT NULL,
  active      BOOLEAN DEFAULT true,
  launch_date DATE,
  zones       JSONB DEFAULT '[]',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Note: We use ON CONFLICT DO NOTHING to ensure idempotency
INSERT INTO public.cities 
  (name, code, state, active, launch_date)
VALUES
  ('Coimbatore', 'CBE', 'Tamil Nadu',  true, '2025-01-01'),
  ('Chennai',    'CHN', 'Tamil Nadu',  true, '2025-01-01'),
  ('Madurai',    'MDU', 'Tamil Nadu',  true, '2025-02-01'),
  ('Trichy',     'TRY', 'Tamil Nadu',  true, '2025-02-01'),
  ('Bangalore',  'BLR', 'Karnataka',   true, '2025-03-01')
ON CONFLICT (code) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.city_localities (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id     UUID REFERENCES public.cities(id),
  city_code   TEXT NOT NULL,
  zone        TEXT,
  locality    TEXT NOT NULL,
  pincode     TEXT,
  active      BOOLEAN DEFAULT true
);

-- Clear existing localities to avoid duplicates during re-runs
TRUNCATE public.city_localities CASCADE;

-- Coimbatore localities
INSERT INTO public.city_localities (city_code, zone, locality) VALUES
('CBE', 'North', 'Saibaba Colony'),
('CBE', 'North', 'Papanaickenpalayam'),
('CBE', 'North', 'Vadavalli'),
('CBE', 'North', 'Chinnavedampatti'),
('CBE', 'North', 'Kuniyamuthur'),
('CBE', 'South', 'Peelamedu'),
('CBE', 'South', 'Singanallur'),
('CBE', 'South', 'Hopes College'),
('CBE', 'South', 'Ram Nagar'),
('CBE', 'South', 'Ondipudur'),
('CBE', 'East',  'RS Puram'),
('CBE', 'East',  'Race Course'),
('CBE', 'East',  'Tatabad'),
('CBE', 'East',  'Ganapathy'),
('CBE', 'East',  'Sowripalayam'),
('CBE', 'West',  'Gandhipuram'),
('CBE', 'West',  'Town Hall'),
('CBE', 'West',  'Cross Cut Road'),
('CBE', 'West',  'Sungam'),
('CBE', 'West',  'Mettupalayam Road'),
('CBE', 'Central','Ukkadam'),
('CBE', 'Central','Coimbatore Junction'),
('CBE', 'Central','Nehru Park'),
('CBE', 'Tech',  'TIDEL Park Area'),
('CBE', 'Tech',  'Huzur Mills Road');

-- Chennai localities
INSERT INTO public.city_localities (city_code, zone, locality) VALUES
('CHN', 'North', 'Perambur'),
('CHN', 'North', 'Kolathur'),
('CHN', 'North', 'Villivakkam'),
('CHN', 'North', 'Ambattur'),
('CHN', 'North', 'Madhavaram'),
('CHN', 'Central','T. Nagar'),
('CHN', 'Central','Nungambakkam'),
('CHN', 'Central','Egmore'),
('CHN', 'Central','Kilpauk'),
('CHN', 'Central','Kodambakkam'),
('CHN', 'Central','Vadapalani'),
('CHN', 'South', 'Adyar'),
('CHN', 'South', 'Velachery'),
('CHN', 'South', 'Guindy'),
('CHN', 'South', 'Pallikaranai'),
('CHN', 'South', 'Sholinganallur'),
('CHN', 'South', 'Mylapore'),
('CHN', 'South', 'Thiruvanmiyur'),
('CHN', 'South', 'Besant Nagar'),
('CHN', 'West',  'Anna Nagar'),
('CHN', 'West',  'Arumbakkam'),
('CHN', 'West',  'Koyambedu'),
('CHN', 'West',  'Ashok Nagar'),
('CHN', 'West',  'K.K. Nagar'),
('CHN', 'West',  'Mogappair'),
('CHN', 'OMR',   'Perungudi'),
('CHN', 'OMR',   'Thoraipakkam'),
('CHN', 'OMR',   'Sholinganallur'),
('CHN', 'OMR',   'Navalur'),
('CHN', 'OMR',   'Siruseri'),
('CHN', 'Suburb','Tambaram'),
('CHN', 'Suburb','Chromepet'),
('CHN', 'Suburb','Pallavaram');

-- Madurai localities
INSERT INTO public.city_localities (city_code, zone, locality) VALUES
('MDU', 'North', 'Anna Nagar'),
('MDU', 'North', 'Villapuram'),
('MDU', 'North', 'Bypass Road'),
('MDU', 'North', 'Nagamalai Pudukottai'),
('MDU', 'North', 'Palanganatham'),
('MDU', 'South', 'Sellur'),
('MDU', 'South', 'Teppakulam'),
('MDU', 'South', 'KK Nagar'),
('MDU', 'South', 'Thirunagar'),
('MDU', 'South', 'Jaihindpuram'),
('MDU', 'East',  'Tallakulam'),
('MDU', 'East',  'Goripalayam'),
('MDU', 'East',  'Ellis Nagar'),
('MDU', 'East',  'Vandiyur'),
('MDU', 'East',  'Kochadai'),
('MDU', 'West',  'Kalavasal'),
('MDU', 'West',  'Sivaganga Road'),
('MDU', 'West',  'Arasaradi'),
('MDU', 'Central','Meenakshi Amman Temple Area'),
('MDU', 'Central','Town Hall'),
('MDU', 'Central','Court Road');

-- Trichy localities
INSERT INTO public.city_localities (city_code, zone, locality) VALUES
('TRY', 'City',  'Thillai Nagar'),
('TRY', 'City',  'KK Nagar'),
('TRY', 'City',  'Cantonment'),
('TRY', 'City',  'Ariyamangalam'),
('TRY', 'City',  'Palakarai'),
('TRY', 'City',  'Srirangam'),
('TRY', 'City',  'Woraiyur'),
('TRY', 'City',  'Tennur'),
('TRY', 'City',  'Karumandapam'),
('TRY', 'Edu',   'NIT Trichy Area'),
('TRY', 'Edu',   'Bharathidasan University Area'),
('TRY', 'Suburb','Tiruvambiyur'),
('TRY', 'Suburb','Mathur'),
('TRY', 'Suburb','Panjapur');

-- Bangalore localities
INSERT INTO public.city_localities (city_code, zone, locality) VALUES
('BLR', 'North', 'Hebbal'),
('BLR', 'North', 'Yelahanka'),
('BLR', 'North', 'Thanisandra'),
('BLR', 'North', 'Jakkur'),
('BLR', 'North', 'RT Nagar'),
('BLR', 'North', 'Kalyan Nagar'),
('BLR', 'South', 'Banashankari'),
('BLR', 'South', 'Jayanagar'),
('BLR', 'South', 'JP Nagar'),
('BLR', 'South', 'BTM Layout'),
('BLR', 'South', 'Hulimavu'),
('BLR', 'South', 'Electronic City'),
('BLR', 'East',  'Whitefield'),
('BLR', 'East',  'Marathahalli'),
('BLR', 'East',  'Bellandur'),
('BLR', 'East',  'Sarjapur Road'),
('BLR', 'East',  'Indiranagar'),
('BLR', 'East',  'Domlur'),
('BLR', 'East',  'Varthur'),
('BLR', 'West',  'Rajajinagar'),
('BLR', 'West',  'Malleswaram'),
('BLR', 'West',  'Vijayanagar'),
('BLR', 'West',  'Yeshwanthpur'),
('BLR', 'Central','MG Road'),
('BLR', 'Central','Koramangala'),
('BLR', 'Central','Indiranagar'),
('BLR', 'Central','Richmond Town'),
('BLR', 'Tech',  'Electronic City Phase 1'),
('BLR', 'Tech',  'Electronic City Phase 2'),
('BLR', 'Tech',  'Whitefield IT Park'),
('BLR', 'Tech',  'ITPL'),
('BLR', 'Tech',  'Bagmane Tech Park'),
('BLR', 'NW',    'Nagarbhavi'),
('BLR', 'NW',    'Kengeri'),
('BLR', 'NW',    'Mysore Road');

-- Update localtiy references based on code
UPDATE public.city_localities cl
SET city_id = c.id
FROM public.cities c
WHERE cl.city_code = c.code;

-- ============================================================
-- EDUDOOR COMPLETE COURSE CATALOG
-- All courses with full details
-- Tamizh Tech Pvt Ltd
-- ============================================================

CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    level TEXT NOT NULL,
    target_audience TEXT,
    short_description TEXT,
    full_description TEXT,
    what_you_learn TEXT[],
    what_included TEXT[],
    prerequisites TEXT[],
    tools_required TEXT[],
    hardware_kit TEXT,
    active BOOLEAN DEFAULT true,
    is_new BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.course_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL,
    display_name TEXT NOT NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    sessions_per_week INTEGER,
    hours_per_session DECIMAL,
    duration_weeks INTEGER,
    features TEXT[],
    not_included TEXT[],
    is_popular BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0
);

-- First clear any existing course data
TRUNCATE public.course_plans CASCADE;
TRUNCATE public.courses CASCADE;

-- ============================================================
-- CATEGORY 1: SCHOOL SUBJECTS (14 Courses)
-- ============================================================

INSERT INTO public.courses (
  name, category, level, target_audience,
  short_description, full_description,
  what_you_learn, what_included,
  prerequisites, tools_required,
  active, is_new, is_popular, sort_order
) VALUES

('Mathematics — Basic (6th, 7th, 8th Grade)',
 'School Subjects', 'Beginner',
 'Students of Grade 6, 7, and 8',
 'Build a rock-solid foundation in school mathematics with concept-based learning.',
 'Our Basic Mathematics course is designed for students in grades 6-8. We focus on building strong conceptual understanding rather than rote memorization. The trainer comes to your home and teaches using interactive methods, real-life examples, and structured practice.',
 ARRAY[
   'Number systems and their properties',
   'Fractions, decimals, and percentages',
   'Basic algebra and linear equations',
   'Geometry: shapes, angles, and area',
   'Ratio, proportion, and unitary method',
   'Basic statistics and data handling',
   'Mensuration: perimeter and area',
   'Introduction to integers and rational numbers'
 ],
 ARRAY[
   'NCERT textbook coverage',
   'Chapter-wise practice worksheets',
   'Handwritten study notes',
   'Monthly progress report card',
   'WhatsApp doubt clearing support',
   'Previous year school exam papers'
 ],
 ARRAY['Basic arithmetic knowledge'],
 ARRAY['Notebook', 'Geometry box', 'Calculator (basic)'],
 true, true, true, 10),

('Mathematics — Intermediate (9th & 10th Grade)',
 'School Subjects', 'Intermediate',
 'Students of Grade 9 and 10 (SSLC)',
 'Complete mathematics preparation for SSLC board examinations with strong concept clarity.',
 'This course covers the complete SSLC Mathematics syllabus for grades 9 and 10. Our verified trainers follow the Tamil Nadu and CBSE syllabi and help students master both concepts and problem-solving techniques required for board exams.',
 ARRAY[
   'Real numbers and polynomials',
   'Linear equations in two variables',
   'Coordinate geometry and graphs',
   'Trigonometry: basics to applications',
   'Mensuration: surface area and volume',
   'Statistics and probability',
   'Quadratic equations and progressions',
   'Circles, triangles, and constructions',
   'Board exam problem-solving strategies'
 ],
 ARRAY[
   'NCERT + State board solutions',
   'Board exam practice papers (5 years)',
   'Formula reference sheets',
   'Chapter-wise test papers',
   'Monthly assessment reports',
   'WhatsApp support for doubts',
   'Priority revision before exams'
 ],
 ARRAY['6th-8th grade mathematics basics'],
 ARRAY['Scientific calculator', 'Geometry box', 'Graph sheets'],
 true, true, true, 11),

('Mathematics — Advanced (11th & 12th Grade)',
 'School Subjects', 'Advanced',
 'Students of Grade 11 and 12 (HSC / JEE aspirants)',
 'Higher secondary mathematics for HSC board exams and JEE Mains preparation.',
 'Advanced Mathematics covers the complete HSC and CBSE Grade 11-12 syllabus. This course also serves as foundation preparation for JEE Mains Mathematics. Our trainer provides rigorous problem-solving practice with step-by-step explanations.',
 ARRAY[
   'Sets, relations, and functions',
   'Trigonometric functions and identities',
   'Complex numbers and quadratics',
   'Permutations, combinations, binomial theorem',
   'Sequences and series',
   'Differential calculus (limits, derivatives)',
   'Integral calculus and applications',
   'Matrices and determinants',
   'Vectors and 3D geometry',
   'Linear programming and probability'
 ],
 ARRAY[
   'Chapter notes (handwritten + printed)',
   'JEE-level practice problems',
   'Board exam question papers (10 years)',
   'Formula booklet',
   'Weekly mock test papers',
   'Doubt clearing sessions',
   'Exam strategy guidance'
 ],
 ARRAY['Strong 9th-10th mathematics foundation'],
 ARRAY['Scientific calculator', 'Graph paper', 'Notebook'],
 true, true, false, 12),

('Physics — Intermediate (9th & 10th Grade)',
 'School Subjects', 'Intermediate',
 'Grade 9 and 10 students preparing for SSLC',
 'Complete Physics for SSLC with clear concepts and numerical problem solving.',
 'Our Physics course for grades 9-10 combines conceptual clarity with numerical practice. The trainer explains real-world applications of every concept, making Physics interesting and easy to understand. Special focus on board exam preparation.',
 ARRAY[
   'Laws of motion and force',
   'Gravitation and pressure',
   'Work, energy, and power',
   'Sound waves and light',
   'Electricity and magnetic effects',
   'Modern physics introduction',
   'Numerical problem-solving techniques',
   'Diagram drawing for exams'
 ],
 ARRAY[
   'Concept notes with diagrams',
   'Numerical practice sets',
   'Board exam papers (5 years)',
   'Diagram practice sheets',
   'Monthly test papers',
   'Formula reference card'
 ],
 ARRAY['Basic science knowledge (8th grade)'],
 ARRAY['Scientific calculator', 'Notebook'],
 true, true, false, 13),

('Physics — Advanced (11th & 12th Grade)',
 'School Subjects', 'Advanced',
 'Grade 11 and 12 students and JEE/NEET aspirants',
 'Advanced Physics for HSC board exams and competitive exam preparation.',
 'This comprehensive Physics course covers the complete HSC and CBSE Grade 11-12 syllabus. Our trainers have experience in JEE and NEET coaching and provide the right depth of coverage for both board and competitive exams.',
 ARRAY[
   'Mechanics: kinematics, Newton''s laws, work-energy',
   'Rotational motion and gravitation',
   'Properties of matter and fluid mechanics',
   'Thermodynamics and kinetic theory',
   'Oscillations, waves, and sound',
   'Electrostatics and current electricity',
   'Magnetism and electromagnetic induction',
   'Electromagnetic waves and optics',
   'Modern physics: dual nature, atoms, nuclei',
   'Semiconductor devices'
 ],
 ARRAY[
   'Detailed chapter notes',
   'JEE/NEET level MCQs',
   'Numerical problem banks',
   'Previous year board + JEE papers',
   'Formula revision sheets',
   'Mock test papers',
   'Exam strategy sessions'
 ],
 ARRAY['Strong 9th-10th Physics and Mathematics'],
 ARRAY['Scientific calculator', 'Notebook'],
 true, true, false, 14),

('Chemistry — Intermediate (9th & 10th Grade)',
 'School Subjects', 'Intermediate',
 'Grade 9 and 10 students',
 'Chemistry for SSLC with conceptual clarity and practical understanding.',
 'Our Chemistry course for SSLC makes complex chemical concepts simple and relatable. The trainer uses everyday examples and mnemonics to help students remember reactions, equations, and concepts. Includes complete board exam preparation.',
 ARRAY[
   'Matter and its classification',
   'Atoms, molecules, and chemical formula',
   'Chemical reactions and equations',
   'Acids, bases, and salts',
   'Metals and non-metals',
   'Carbon compounds and organic basics',
   'Periodic table and periodic properties',
   'Chemical bonding introduction',
   'Balancing chemical equations'
 ],
 ARRAY[
   'Reaction summary sheets',
   'Equation balancing practice',
   'Mnemonic cards for memorization',
   'Board exam papers',
   'Lab concept notes',
   'Monthly test papers'
 ],
 ARRAY['8th grade science basics'],
 ARRAY['Notebook', 'Periodic table chart'],
 true, true, false, 15),

('Chemistry — Advanced (11th & 12th Grade)',
 'School Subjects', 'Advanced',
 'Grade 11 and 12 students and NEET/JEE aspirants',
 'Advanced Chemistry covering Physical, Organic, and Inorganic for HSC and competitive exams.',
 'Comprehensive Chemistry course for grades 11-12 covering all three branches: Physical, Organic, and Inorganic Chemistry. Trainer focuses on reaction mechanisms, numerical problems, and NEET/JEE question patterns.',
 ARRAY[
   'Physical chemistry: mole concept, thermodynamics, kinetics',
   'Electrochemistry and solutions',
   'Organic chemistry: nomenclature and basics',
   'Reaction mechanisms: substitution, addition, elimination',
   'Alcohols, phenols, ethers, aldehydes, ketones',
   'Carboxylic acids and amines',
   'Inorganic: p-block, d-block, f-block elements',
   'Coordination compounds',
   'Biomolecules and polymers'
 ],
 ARRAY[
   'Reaction mechanism charts',
   'NEET-focused MCQ bank',
   'Organic reaction summary sheets',
   'Board exam papers (10 years)',
   'Physical chemistry numerical sets',
   'Mock test papers'
 ],
 ARRAY['9th-10th Chemistry basics'],
 ARRAY['Scientific calculator', 'Notebook'],
 true, true, false, 16),

('Biology — Intermediate (9th & 10th Grade)',
 'School Subjects', 'Intermediate',
 'Grade 9 and 10 students',
 'Biology for SSLC with diagram-focused learning and concept clarity.',
 'Our Biology course for SSLC makes life science fascinating. The trainer focuses on diagram drawing, concept understanding, and the interconnection between topics. Special emphasis on board exam diagram questions and long-answer techniques.',
 ARRAY[
   'Cell structure and cell division',
   'Life processes: nutrition, respiration, transportation',
   'Nervous system and hormonal coordination',
   'Reproduction in organisms',
   'Heredity and evolution basics',
   'Our environment and ecosystem',
   'Management of natural resources',
   'Diagram drawing techniques for exams'
 ],
 ARRAY[
   'Labeled diagram sheets',
   'Chapter summary notes',
   'Board exam papers',
   'Diagram practice booklet',
   'Monthly test papers'
 ],
 ARRAY['Basic science knowledge'],
 ARRAY['Notebook', 'Colored pens for diagrams'],
 true, true, false, 17),

('Biology — Advanced (11th & 12th Grade / NEET)',
 'School Subjects', 'Advanced',
 'Grade 11 and 12 students and NEET aspirants',
 'Complete Biology for HSC and NEET with Botany and Zoology coverage.',
 'Our Advanced Biology course covers both Botany and Zoology as required for HSC and NEET examinations. The trainer follows NCERT precisely (the NEET Bible) and provides extensive MCQ practice and diagram training for maximum marks.',
 ARRAY[
   'Cell biology: structure, division, biomolecules',
   'Plant physiology: photosynthesis, respiration, growth',
   'Plant kingdom: classification and reproduction',
   'Human physiology: all systems in detail',
   'Genetics: Mendelian and molecular genetics',
   'Evolution: Darwinism and modern synthesis',
   'Ecology: ecosystems, biodiversity, conservation',
   'Biotechnology and its applications',
   'Reproduction: flowering plants and humans'
 ],
 ARRAY[
   'NCERT-aligned notes (chapter-wise)',
   'NEET MCQ question bank (2000+ questions)',
   'Diagram practice booklet',
   'Previous year NEET papers (10 years)',
   'Botany and Zoology quick revision cards',
   'Mock test papers'
 ],
 ARRAY['10th grade Biology'],
 ARRAY['Notebook', 'Colored pens', 'NCERT textbook'],
 true, true, true, 18),

('Commerce & Accountancy (11th & 12th Grade)',
 'School Subjects', 'Advanced',
 'Grade 11 and 12 Commerce stream students',
 'Complete Commerce stream coverage: Accountancy, Business Studies, and Economics.',
 'Comprehensive Commerce course for the complete HSC Commerce stream. Our trainer covers Accountancy (journal entries to final accounts), Business Studies, and Economics concepts in a structured manner with practice problems and board exam techniques.',
 ARRAY[
   'Accountancy: journal, ledger, trial balance',
   'Financial statements: trading, P&L, balance sheet',
   'Partnership accounts: admission, retirement, dissolution',
   'Company accounts: shares and debentures',
   'Business studies: nature, forms, management',
   'Marketing and consumer protection',
   'Economics: micro and macro basics',
   'Indian economic development',
   'Board exam answer writing techniques'
 ],
 ARRAY[
   'Journal entry practice booklets',
   'Balance sheet templates',
   'Business studies notes',
   'Board exam papers (5 years)',
   'Chapter-wise test papers',
   'Formula and ratio reference sheet'
 ],
 ARRAY['10th grade commerce or basic math'],
 ARRAY['Calculator', 'Notebook', 'Ledger practice pad'],
 true, true, false, 19),

('Social Studies (6th, 7th, 8th Grade)',
 'School Subjects', 'Beginner',
 'Middle school students (Grade 6-8)',
 'Engaging Social Studies covering History, Geography, and Civics for middle school.',
 'Social Studies becomes interesting when taught with stories, maps, and real-world connections. Our trainer makes History, Geography, and Civics come alive through visual learning and discussion-based teaching.',
 ARRAY[
   'Ancient and medieval Indian history',
   'Modern Indian history and freedom struggle',
   'World geography: continents and countries',
   'Indian geography: physical and political',
   'Indian constitution and civics basics',
   'Economics: basic concepts for students',
   'Map reading and drawing skills',
   'Current events and their historical context'
 ],
 ARRAY[
   'Chapter summary notes',
   'Map practice sheets',
   'Timeline charts',
   'NCERT coverage notes',
   'Monthly test papers'
 ],
 ARRAY['Curiosity about history and geography'],
 ARRAY['Atlas', 'Notebook', 'Colored pencils for maps'],
 true, false, false, 20),

('Hindi (All Grades)',
 'School Subjects', 'Beginner',
 'Students who want to learn or improve Hindi',
 'Hindi language for Tamil Nadu and Karnataka students — reading, writing, and speaking.',
 'Our Hindi course is specially designed for students in Tamil Nadu and Karnataka where Hindi is a second or third language. The trainer focuses on practical communication, grammar, and exam techniques for school Hindi papers.',
 ARRAY[
   'Hindi alphabet: Devanagari script mastery',
   'Reading: basic to advanced texts',
   'Writing: words, sentences, paragraphs',
   'Grammar: nouns, verbs, adjectives, tenses',
   'Conversation and speaking practice',
   'Essay, letter, and story writing',
   'School exam patterns and scoring techniques',
   'Vocabulary building (500+ common words)'
 ],
 ARRAY[
   'Hindi alphabet chart',
   'Grammar rules booklet',
   'Vocabulary cards',
   'Practice writing sheets',
   'School paper samples'
 ],
 ARRAY['Willingness to learn'],
 ARRAY['Hindi notebook', 'Hindi textbook (school level)'],
 true, false, false, 21),

('Tamil (All Grades)',
 'School Subjects', 'Beginner',
 'Students who want to improve Tamil language skills',
 'Tamil language strengthening for school students — grammar, writing, and literature.',
 'Our Tamil course helps students master Tamil language for school examinations. The trainer covers grammar, literature comprehension, and effective answer writing techniques to score maximum marks in Tamil papers.',
 ARRAY[
   'Tamil grammar: nouns, verbs, syntax',
   'Literature comprehension techniques',
   'Essay writing in Tamil',
   'Letter writing formats',
   'Poem appreciation and analysis',
   'Idiomatic expressions and proverbs',
   'Board exam answer writing strategies',
   'Classical Tamil basics'
 ],
 ARRAY[
   'Grammar summary notes',
   'Essay format templates',
   'Literature notes',
   'Previous year papers',
   'Vocabulary practice sheets'
 ],
 ARRAY['Basic Tamil reading ability'],
 ARRAY['Tamil textbook', 'Notebook'],
 true, false, false, 22),

('Science — Basic (6th, 7th, 8th Grade)',
 'School Subjects', 'Beginner',
 'Middle school students (Grade 6-8)',
 'Integrated Science for middle school: Physics, Chemistry, and Biology concepts.',
 'Our integrated Science course for grades 6-8 covers all three science disciplines in an age-appropriate, curiosity-building manner. The trainer uses simple experiments, models, and real-life examples to make science exciting.',
 ARRAY[
   'Matter: states, properties, and changes',
   'Force, motion, and simple machines',
   'Light, sound, and heat',
   'Electricity: basic concepts and circuits',
   'Living organisms: cells, tissues, organs',
   'Plants: photosynthesis, reproduction',
   'Human body: systems overview',
   'Environment and natural resources'
 ],
 ARRAY[
   'Chapter notes with diagrams',
   'Simple experiment guide (home lab)',
   'NCERT coverage worksheets',
   'Monthly test papers',
   'Diagram practice sheets'
 ],
 ARRAY['Curiosity about science'],
 ARRAY['Notebook', 'Colored pencils for diagrams'],
 true, false, false, 23);

-- ============================================================
-- CATEGORY 2: PROGRAMMING (11 Courses)
-- ============================================================

INSERT INTO public.courses (
  name, category, level, target_audience,
  short_description, full_description,
  what_you_learn, what_included,
  prerequisites, tools_required,
  active, is_new, is_popular, sort_order
) VALUES

('Python Programming — Beginner',
 'Programming', 'Beginner',
 'Complete beginners, school students (Grade 8+), college students, adults',
 'Learn Python from absolute scratch with hands-on projects. No prior coding experience needed.',
 'Python is the world''s most popular programming language and the gateway to AI, data science, automation, and web development. This beginner course starts from zero — even if you''ve never written a single line of code. Our trainer guides you through every concept step-by-step with live coding exercises.',
 ARRAY[
   'Installing Python and setting up VS Code',
   'Variables, data types, and input/output',
   'Conditional statements: if, elif, else',
   'Loops: for, while, loop control',
   'Functions: definition, parameters, return',
   'Lists, tuples, sets, and dictionaries',
   'String manipulation and formatting',
   'File reading and writing',
   'Error handling with try-except',
   'Mini project: Calculator, Quiz Game, Contact Book'
 ],
 ARRAY[
   'Python beginner guide PDF (80 pages)',
   'Hands-on exercise file (50+ programs)',
   'Project source code with explanations',
   'Cheatsheet reference card',
   'Chapter-wise practice problems',
   'VS Code setup guide'
 ],
 ARRAY['Basic computer usage', 'No coding experience required'],
 ARRAY['Laptop or desktop with Python 3.10+ installed', 'VS Code (free)'],
 true, true, true, 40),

('Python Programming — Intermediate',
 'Programming', 'Intermediate',
 'Students who know Python basics and want to build real projects',
 'Level up Python with Object-Oriented Programming, APIs, databases, and real-world projects.',
 'This intermediate course takes you from Python basics to building real applications. You''ll master OOP, work with external APIs, store data in databases, and scrape websites. By the end, you''ll have a portfolio of projects to show employers and colleges.',
 ARRAY[
   'Object-Oriented Programming (OOP): classes, objects, inheritance',
   'Modules, packages, and the standard library',
   'Working with JSON data',
   'Making HTTP requests and using APIs',
   'Connecting to SQLite database',
   'Web scraping with BeautifulSoup',
   'Regular expressions (RegEx)',
   'Virtual environments and pip',
   'Introduction to NumPy and Pandas',
   'Projects: Weather app, Expense tracker, Web scraper'
 ],
 ARRAY[
   'OOP concept reference guide',
   'API project code with documentation',
   'Database project code',
   'Pandas and NumPy exercise files',
   'Project portfolio guide'
 ],
 ARRAY['Python Beginner level (variables, loops, functions)'],
 ARRAY['Laptop', 'Python 3.10+', 'VS Code', 'Internet connection'],
 true, true, true, 41),

('Python Programming — Advanced',
 'Programming', 'Advanced',
 'Python intermediate learners ready for professional-level skills',
 'Advanced Python: Data Structures, Algorithms, Django basics, and deployment.',
 'This advanced course prepares you for software development jobs and higher studies. You''ll master data structures and algorithms (essential for coding interviews), build a web application with Django, write unit tests, and deploy your project online.',
 ARRAY[
   'Advanced data structures: stacks, queues, trees, graphs',
   'Algorithm analysis and Big-O notation',
   'Sorting and searching algorithms',
   'Dynamic programming fundamentals',
   'Django framework: models, views, templates',
   'REST API development with Django REST Framework',
   'Database: PostgreSQL with Python',
   'Unit testing with pytest',
   'Git and version control',
   'Deploying Django app on Render/Heroku'
 ],
 ARRAY[
   'Algorithm practice problem set (100+ problems)',
   'Django project starter template',
   'API documentation guide',
   'Deployment step-by-step guide',
   'Git command reference'
 ],
 ARRAY['Python Intermediate level', 'Understanding of OOP'],
 ARRAY['Laptop', 'Python 3.10+', 'VS Code', 'Git', 'GitHub account (free)'],
 true, true, false, 42),

('Web Development — Beginner (HTML & CSS)',
 'Programming', 'Beginner',
 'Complete beginners wanting to build websites',
 'Build beautiful websites from scratch using HTML and CSS. No experience required.',
 'Every website you visit is built with HTML and CSS. In this course, you''ll go from zero to building complete, beautiful, and responsive websites. Our trainer guides you through every concept live, and you''ll build real websites that work on all devices.',
 ARRAY[
   'HTML: structure, tags, elements, attributes',
   'Building forms, tables, and media elements',
   'CSS: selectors, properties, box model',
   'Colors, fonts, and typography',
   'Flexbox layout (industry standard)',
   'CSS Grid for complex layouts',
   'Responsive design for mobile phones',
   'CSS animations and hover effects',
   'Build 3 complete websites as projects'
 ],
 ARRAY[
   'HTML reference cheatsheet',
   'CSS properties guide',
   'Project source code (all 3 websites)',
   'Responsive design guide',
   'Free hosting setup guide'
 ],
 ARRAY['Basic computer and internet skills'],
 ARRAY['Laptop', 'VS Code (free)', 'Google Chrome browser'],
 true, true, false, 43),

('Web Development — Intermediate (JavaScript)',
 'Programming', 'Intermediate',
 'Students who know HTML/CSS and want to add interactivity',
 'Master JavaScript and build interactive web applications. Includes React basics.',
 'JavaScript is what makes websites interactive and dynamic. This course takes you from HTML/CSS basics to building full interactive web applications. You''ll learn modern JavaScript (ES6+), DOM manipulation, and get a solid introduction to React.',
 ARRAY[
   'JavaScript fundamentals: variables, functions, scope',
   'ES6+: arrow functions, destructuring, spread operator',
   'DOM manipulation and events',
   'Asynchronous JS: callbacks, promises, async/await',
   'Fetch API: working with APIs',
   'JSON data handling',
   'Introduction to React',
   'React: components, props, state',
   'Building a mini React application',
   'Project: Interactive To-Do app, Weather App'
 ],
 ARRAY[
   'JavaScript cheatsheet',
   'ES6 quick reference',
   'React project starter',
   'Project source code with comments',
   'API references used'
 ],
 ARRAY['HTML and CSS basics'],
 ARRAY['Laptop', 'VS Code', 'Node.js installed', 'Chrome browser'],
 true, true, false, 44),

('Web Development — Advanced (Full Stack MERN)',
 'Programming', 'Advanced',
 'JavaScript developers ready for full-stack development',
 'Become a Full Stack Developer with MongoDB, Express, React, and Node.js (MERN).',
 'The MERN stack is one of the most in-demand technology combinations for web development jobs. This advanced course makes you a complete full-stack developer. You''ll build a production-ready web application and learn to deploy it online.',
 ARRAY[
   'Node.js and Express.js backend development',
   'MongoDB database and Mongoose ODM',
   'RESTful API design and development',
   'User authentication with JWT',
   'Advanced React: hooks, context, routing',
   'Redux for state management',
   'File uploads and cloud storage',
   'Payment integration',
   'Deployment: Frontend (Vercel) + Backend (Render)',
   'Capstone project: Full e-commerce or portfolio site'
 ],
 ARRAY[
   'MERN project boilerplate code',
   'API documentation template',
   'Authentication flow diagram',
   'Deployment checklist',
   'GitHub portfolio guide'
 ],
 ARRAY['JavaScript Intermediate level', 'React basics'],
 ARRAY['Laptop', 'Node.js', 'MongoDB Compass', 'VS Code', 'Git', 'Postman'],
 true, true, false, 45),

('Java Programming — Beginner',
 'Programming', 'Beginner',
 'Students and freshers wanting to learn Java for college or jobs',
 'Learn Java fundamentals and OOP — the language used in Android, enterprise software, and colleges.',
 'Java is one of the most widely taught and used programming languages in colleges and enterprise software. This beginner course covers Java fundamentals and Object-Oriented Programming with hands-on practice and real programs.',
 ARRAY[
   'Java setup and first program',
   'Data types, variables, and operators',
   'Control flow: if-else, switch',
   'Loops: for, while, do-while',
   'Arrays and strings',
   'Object-Oriented Programming: classes, objects',
   'Inheritance, polymorphism, encapsulation',
   'Abstract classes and interfaces',
   'Exception handling',
   'Collections framework basics',
   'Simple console application projects'
 ],
 ARRAY[
   'Java syntax reference guide',
   'OOP concept chart',
   'Practice problem sets',
   'Project code with explanations',
   'College exam preparation notes'
 ],
 ARRAY['Basic computer skills', 'No prior programming needed'],
 ARRAY['Laptop', 'JDK 17+ installed (free)', 'Eclipse or IntelliJ IDEA (free)'],
 true, true, false, 46),

('C Programming — Beginner',
 'Programming', 'Beginner',
 'Engineering students, school students (Grade 11-12 CS), beginners',
 'Master C language — the foundation of all programming languages.',
 'C is the foundation of computer science and is taught in most engineering colleges. This course covers C from scratch with a focus on the concepts that carry forward to C++, Java, and system programming.',
 ARRAY[
   'C program structure and compilation',
   'Data types, operators, and expressions',
   'Input/output with printf and scanf',
   'Control statements and loops',
   'Functions: definition, scope, recursion',
   'Arrays: single and multi-dimensional',
   'Pointers and memory management',
   'Structures and unions',
   'File I/O operations',
   'Practical mini programs'
 ],
 ARRAY[
   'C programming reference guide',
   'Pointer concept diagram',
   'Practice program bank (100+ programs)',
   'College exam question bank'
 ],
 ARRAY['Basic computer skills'],
 ARRAY['Laptop', 'GCC compiler (free)', 'Code::Blocks IDE (free)'],
 true, true, false, 47),

('C++ Programming — Intermediate',
 'Programming', 'Intermediate',
 'Students who know C or any programming language',
 'Learn C++ with OOP, STL, and competitive programming foundations.',
 'C++ is widely used in competitive programming, game development, and systems programming. This course builds on programming basics to teach C++-specific features including OOP, templates, and the Standard Template Library (STL).',
 ARRAY[
   'C++ vs C: differences and advantages',
   'OOP in C++: classes, objects, constructors',
   'Inheritance and polymorphism in C++',
   'Operator overloading',
   'Templates and generic programming',
   'STL: vector, map, set, stack, queue',
   'File handling in C++',
   'Introduction to competitive programming',
   'Basic algorithms in C++'
 ],
 ARRAY[
   'C++ STL reference guide',
   'OOP practice problems',
   'Competitive programming starter guide',
   'Practice problem sets'
 ],
 ARRAY['C programming or any programming language basics'],
 ARRAY['Laptop', 'GCC/G++ compiler', 'Code::Blocks or VS Code'],
 true, false, false, 48),

('Data Structures & Algorithms — Advanced',
 'Programming', 'Advanced',
 'Programming students preparing for job interviews or competitive programming',
 'Master DSA for cracking coding interviews at product companies and competitive programming.',
 'Data Structures and Algorithms (DSA) is the most important skill for getting placed in product-based companies (TCS, Infosys, Wipro, startups). This course teaches DSA systematically with interview-focused problem solving.',
 ARRAY[
   'Arrays, strings, and complexity analysis (Big-O)',
   'Linked lists: singly, doubly, circular',
   'Stacks and queues: implementations and problems',
   'Binary trees and binary search trees',
   'Graphs: BFS, DFS, shortest path',
   'Hashing and hash maps',
   'Sorting: merge sort, quick sort, heap sort',
   'Binary search and two-pointer techniques',
   'Dynamic programming: top-down and bottom-up',
   'Greedy algorithms and backtracking'
 ],
 ARRAY[
   'DSA problem sheet (200+ curated problems)',
   'Solution walkthroughs with explanations',
   'Interview preparation guide',
   'Time complexity cheatsheet',
   'Company-wise question patterns'
 ],
 ARRAY['Any programming language (Python/Java/C++)'],
 ARRAY['Laptop', 'Any IDE', 'LeetCode account (free)'],
 true, true, true, 49),

('Mobile App Development — Beginner (Flutter)',
 'Programming', 'Beginner',
 'Students and beginners who want to build Android/iOS apps',
 'Build cross-platform mobile apps for Android and iOS using Flutter and Dart.',
 'Flutter by Google is the world''s most popular cross-platform mobile development framework. With one codebase, you can build apps for both Android and iOS. This beginner course takes you from zero to publishing your first mobile app.',
 ARRAY[
   'Dart programming language basics',
   'Flutter setup and first app',
   'Widgets: Text, Container, Row, Column, Stack',
   'Layouts: Scaffold, AppBar, navigation',
   'State management with setState',
   'Forms and user input validation',
   'Network calls and API integration',
   'Local storage with SharedPreferences',
   'Publishing app to Google Play Store',
   'Projects: Todo App, Weather App, Quiz App'
 ],
 ARRAY[
   'Flutter/Dart syntax guide',
   'Widget reference card',
   'Project source code',
   'Play Store publishing guide'
 ],
 ARRAY['Basic programming knowledge (any language preferred)'],
 ARRAY['Laptop', 'Android Studio (free)', 'Android phone or emulator'],
 true, true, false, 50);

-- ============================================================
-- CATEGORY 3: AI & MACHINE LEARNING (7 Courses)
-- ============================================================

INSERT INTO public.courses (
  name, category, level, target_audience,
  short_description, full_description,
  what_you_learn, what_included,
  prerequisites, tools_required,
  active, is_new, is_popular, sort_order
) VALUES

('AI Fundamentals — Beginner (Zero Coding)',
 'AI & ML', 'Beginner',
 'Anyone curious about AI — no technical background needed',
 'Understand Artificial Intelligence, Machine Learning, and ChatGPT without any coding.',
 'Artificial Intelligence is transforming every industry. This course helps you understand AI at a conceptual level — how it works, where it is used, and what the future holds. No coding required. Perfect for students, parents, teachers, and professionals who want to understand AI.',
 ARRAY[
   'What is Artificial Intelligence and Machine Learning',
   'History of AI: from chess computers to ChatGPT',
   'Types of AI: Narrow AI vs General AI',
   'How machine learning actually works (with examples)',
   'Neural networks explained simply',
   'AI tools: ChatGPT, Gemini, Midjourney, Copilot',
   'AI in everyday life: recommendations, maps, filters',
   'AI in healthcare, agriculture, and education',
   'Ethics of AI: bias, privacy, and job displacement',
   'Future career opportunities in AI'
 ],
 ARRAY[
   'AI concept slides and visual guide',
   'AI tools practical exercise sheet',
   'Career roadmap in AI',
   'Recommended resources for deeper learning'
 ],
 ARRAY['Basic computer and internet usage'],
 ARRAY['Laptop or tablet with internet'],
 true, true, true, 60),

('Machine Learning — Intermediate',
 'AI & ML', 'Intermediate',
 'Python developers who want to enter AI/ML',
 'Build real Machine Learning models using Python, scikit-learn, and Pandas.',
 'This hands-on Machine Learning course teaches you to build, train, and evaluate ML models using Python. You''ll work with real datasets, understand when to use which algorithm, and build a portfolio of ML projects.',
 ARRAY[
   'ML types: supervised, unsupervised, reinforcement',
   'Data preprocessing with Pandas and NumPy',
   'Data visualization with Matplotlib and Seaborn',
   'Linear regression: theory and implementation',
   'Logistic regression and classification',
   'Decision trees and random forests',
   'Support Vector Machines (SVM)',
   'K-means clustering',
   'Model evaluation: accuracy, precision, recall, F1',
   'Feature engineering and selection',
   'Real dataset projects (3 complete projects)'
 ],
 ARRAY[
   'Dataset files for all projects',
   'Jupyter notebook files (annotated)',
   'ML algorithm cheatsheet',
   'Project documentation guide',
   'Google Colab setup guide'
 ],
 ARRAY['Python programming (functions, lists, basic OOP)', 'Basic statistics'],
 ARRAY['Laptop', 'Python with scikit-learn, pandas, matplotlib (via pip)', 'Google Colab (free)'],
 true, true, true, 61),

('Machine Learning — Advanced',
 'AI & ML', 'Advanced',
 'ML practitioners ready for neural networks and deployment',
 'Advanced ML with neural networks, deep learning, and model deployment on cloud.',
 'This advanced course takes you from classical ML to neural networks and model deployment. You''ll build and optimize deep learning models, understand the math behind them, and deploy ML applications that can be used by real users.',
 ARRAY[
   'Neural networks from scratch (without libraries)',
   'Deep learning with TensorFlow and Keras',
   'Optimization: gradient descent, Adam, learning rate',
   'Regularization: dropout, batch normalization',
   'Convolutional Neural Networks (CNN) for images',
   'Transfer learning with pre-trained models',
   'Natural language processing basics',
   'Model optimization and hyperparameter tuning',
   'Saving, loading, and exporting models',
   'Deployment: Flask API + Heroku or Render',
   'Capstone project: End-to-end ML application'
 ],
 ARRAY[
   'TensorFlow/Keras code templates',
   'Model architecture reference',
   'Deployment guide (step-by-step)',
   'Colab notebooks for all sessions'
 ],
 ARRAY['Machine Learning Intermediate level', 'Python OOP', 'Linear algebra basics'],
 ARRAY['Laptop', 'Google Colab (free GPU)', 'Python', 'TensorFlow/Keras'],
 true, true, false, 62),

('Deep Learning — Advanced',
 'AI & ML', 'Advanced',
 'ML engineers wanting to specialize in deep learning',
 'Master Deep Learning: CNNs, RNNs, LSTMs, GANs, and Transformers.',
 'Deep learning is the technology behind image recognition, voice assistants, language models, and more. This advanced specialization course covers the full depth of modern deep learning architectures with practical implementations.',
 ARRAY[
   'Mathematics review: linear algebra, calculus for DL',
   'Multi-layer perceptrons and backpropagation',
   'Convolutional Neural Networks (CNN): architecture and applications',
   'Object detection: YOLO, R-CNN',
   'Recurrent Neural Networks (RNN) and LSTMs',
   'Sequence-to-sequence models',
   'Attention mechanism and Transformers',
   'Generative Adversarial Networks (GANs)',
   'Autoencoders and variational autoencoders',
   'Large Language Model concepts',
   'Research paper reading skills'
 ],
 ARRAY[
   'Research papers (simplified summaries)',
   'Architecture diagrams',
   'Colab notebooks for all implementations',
   'GPU optimization guide'
 ],
 ARRAY['ML Advanced level', 'Strong Python', 'Linear algebra knowledge'],
 ARRAY['Laptop', 'Google Colab Pro or GPU access', 'PyTorch or TensorFlow'],
 true, true, false, 63),

('Natural Language Processing (NLP) — Advanced',
 'AI & ML', 'Advanced',
 'ML engineers interested in text and language AI',
 'Build NLP systems for text analysis, chatbots, sentiment analysis, and language generation.',
 'NLP is the technology behind ChatGPT, Google Translate, and voice assistants. This course teaches you to work with text data and build NLP applications from scratch.',
 ARRAY[
   'Text preprocessing: tokenization, stemming, lemmatization',
   'Bag of Words and TF-IDF',
   'Word embeddings: Word2Vec, GloVe',
   'Sentiment analysis project',
   'Named Entity Recognition (NER)',
   'Text classification with deep learning',
   'Sequence models for NLP',
   'Transformer architecture (BERT, GPT concepts)',
   'Using HuggingFace Transformers library',
   'Building a simple chatbot',
   'Capstone: NLP application of your choice'
 ],
 ARRAY[
   'NLP preprocessing code templates',
   'HuggingFace setup guide',
   'Project Jupyter notebooks',
   'Dataset links and descriptions'
 ],
 ARRAY['ML Intermediate level', 'Python proficiency'],
 ARRAY['Laptop', 'Python', 'Google Colab', 'HuggingFace account (free)'],
 true, true, false, 64),

('Computer Vision — Advanced',
 'AI & ML', 'Advanced',
 'ML engineers and robotics enthusiasts interested in vision systems',
 'Build computer vision systems for image recognition, object detection, and video analysis.',
 'Computer vision enables machines to see and interpret visual information. Used in self-driving cars, medical imaging, security cameras, and robotics. This course teaches practical CV skills from basic image processing to deep learning-based detection.',
 ARRAY[
   'Image processing with OpenCV: read, write, transform',
   'Color spaces, filtering, edge detection',
   'Feature detection: SIFT, ORB, SURF',
   'Image segmentation techniques',
   'CNN for image classification',
   'Transfer learning for image recognition',
   'Object detection with YOLO',
   'Face detection and recognition',
   'Optical flow and video analysis',
   'Depth estimation basics',
   'Real-world project: Smart surveillance or object counter'
 ],
 ARRAY[
   'OpenCV code templates',
   'YOLO configuration files',
   'Project source code',
   'Colab notebooks'
 ],
 ARRAY['Python Intermediate', 'ML basics', 'Basic linear algebra'],
 ARRAY['Laptop', 'Python with OpenCV', 'Google Colab', 'Webcam (for live demos)'],
 true, true, false, 65),

('AI for Kids (8-14 Years) — Beginner',
 'AI & ML', 'Beginner',
 'Children aged 8-14 years who want to explore AI and coding',
 'Fun AI projects for kids using Scratch, ML for Kids, and beginner-friendly tools.',
 'Introduce your child to Artificial Intelligence in the most fun way possible! No complex coding needed. Children learn through games, visual programming, and age-appropriate AI projects. They''ll build their own trained AI models and feel the magic of technology.',
 ARRAY[
   'What robots and AI can do (with fun examples)',
   'Introduction to Scratch programming (visual blocks)',
   'Building a Scratch game with AI elements',
   'ML for Kids platform: train your own model',
   'Image recognition: teach AI to recognize objects',
   'Voice command projects',
   'Chatbot creation (beginner level)',
   'Data and pattern recognition games',
   'Creative AI art projects',
   'Final project: Your own AI creation!'
 ],
 ARRAY[
   'Kids AI activity guidebook',
   'Scratch project files',
   'Parent guide: continuing learning at home',
   'Completion certificate for kids'
 ],
 ARRAY['Basic tablet or laptop usage', 'No prior coding experience'],
 ARRAY['Laptop or tablet', 'Scratch account (free)', 'ML for Kids account (free)'],
 true, true, true, 66);

-- ============================================================
-- CATEGORY 4: ELECTRONICS (5 Courses)
-- ============================================================

INSERT INTO public.courses (
  name, category, level, target_audience,
  short_description, full_description,
  what_you_learn, what_included,
  prerequisites, tools_required, hardware_kit,
  active, is_new, is_popular, sort_order
) VALUES

('Basic Electronics — Beginner',
 'Electronics', 'Beginner',
 'School students (Grade 9+), engineering freshers, electronics hobbyists',
 'Learn electronics from scratch with hands-on breadboard experiments. Components kit included.',
 'Electricity and electronics are the foundation of all modern technology. This beginner course makes electronics practical and fun. The trainer brings the component kit and conducts experiments at your home. You''ll build real working circuits and understand how they function.',
 ARRAY[
   'Ohm''s Law and basic circuit laws (KVL, KCL)',
   'Electronic components: resistors, capacitors, inductors',
   'Breadboard usage and circuit connections',
   'Voltage, current, and resistance measurement with multimeter',
   'LED circuits: single, series, parallel',
   'Voltage divider and potential divider',
   'Basic transistor as a switch',
   'Reading component datasheets',
   'Buzzer alarm circuit',
   'Light-dependent resistor (LDR) circuit',
   '5 complete hands-on projects'
 ],
 ARRAY[
   'Component identification guide (PDF)',
   'Circuit diagram reference sheets',
   'Experiment procedure notes',
   'Safety guidelines for electronics',
   'Component datasheet reading guide'
 ],
 ARRAY['Basic mathematics (Ohm''s law math is simple)', 'Curiosity about electronics'],
 ARRAY['Multimeter (trainer brings)', 'Laptop (optional for simulations)'],
 'Breadboard, Jumper wires, LED set (10 colors), Resistor pack (100 pcs),
  Capacitor pack, 9V battery + connector, Buzzer, LDR, Small transistor set',
 true, true, true, 70),

('Intermediate Electronics — Intermediate',
 'Electronics', 'Intermediate',
 'Students with basic electronics knowledge ready to level up',
 'Transistors, Op-Amps, timer circuits, and PCB design basics with oscilloscope usage.',
 'This intermediate course bridges the gap between basic electronics and professional-level circuit design. You''ll use an oscilloscope (trainer brings), work with active components like transistors and op-amps, and learn PCB design using free software.',
 ARRAY[
   'BJT transistor: theory, biasing, amplifier circuits',
   'MOSFET: theory and switching applications',
   'Operational amplifiers (Op-Amp): comparator, summing, inverting',
   '555 Timer IC: astable and monostable modes',
   'Voltage regulators (7805, 7812) and power supplies',
   'Diode applications: rectifier, clipper, clamper, Zener',
   'Oscilloscope usage and waveform analysis',
   'PCB design basics using EasyEDA (free software)',
   'Sensor circuits: temperature, motion, sound',
   '5+ intermediate circuit projects'
 ],
 ARRAY[
   'Transistor biasing calculation guide',
   'Op-Amp circuit reference',
   'PCB design tutorial (EasyEDA)',
   'Oscilloscope usage guide',
   'Circuit simulation guide (Falstad)'
 ],
 ARRAY['Basic Electronics course OR equivalent knowledge'],
 ARRAY['Laptop with EasyEDA and Falstad (both free online)', 'Oscilloscope (trainer brings)'],
 'BJT transistor set (BC547, BC557), MOSFET set (IRF540),
  Op-Amp ICs (LM741, LM358), 555 Timer IC, Voltage regulators,
  Zener diode set, Various sensors, Breadboard (extra)',
 true, true, false, 71),

('Advanced Electronics — Advanced',
 'Electronics', 'Advanced',
 'Electronics enthusiasts and engineering students ready for professional-level projects',
 'Microcontroller interfacing, PCB design, power electronics, and complete product design.',
 'This advanced course prepares you for professional electronics product development. You''ll design complete PCBs, work with microcontrollers (AVR/Arduino), understand power electronics, and design a complete working product from concept to prototype.',
 ARRAY[
   'Microcontroller architecture (ATmega/AVR basics)',
   'AVR programming in C (GPIO, timers, UART, SPI, I2C)',
   'Motor drivers: H-bridge, L298N, stepper motor control',
   'ADC and DAC: analog-digital conversion',
   'PWM: concept and applications',
   'Power supply design: linear and switching',
   'PCB design with KiCad (professional tool)',
   'PCB manufacturing process',
   'RF basics: antennas and wireless communication',
   'Complete product design project'
 ],
 ARRAY[
   'KiCad PCB design tutorial',
   'Microcontroller reference manual',
   'Product design project guide',
   'Component sourcing guide for India'
 ],
 ARRAY['Intermediate Electronics course OR equivalent'],
 ARRAY['Laptop with KiCad installed (free)', 'AVR programmer (trainer brings)'],
 'ATmega328 microcontroller, AVR programmer (USBasp), L298N motor driver,
  Various sensors, OLED display, PCB prototype materials',
 true, true, false, 72),

('Digital Electronics — Intermediate',
 'Electronics', 'Intermediate',
 'Engineering students, electronics hobbyists, school students (Grade 11+)',
 'Logic gates, flip-flops, counters, and digital system design.',
 'Digital electronics is the foundation of computers, processors, and all digital systems. This course teaches you to design digital circuits from basic logic gates to complex sequential circuits used in real systems.',
 ARRAY[
   'Number systems: binary, octal, hexadecimal, conversions',
   'Boolean algebra and logic simplification',
   'Logic gates: AND, OR, NOT, NAND, NOR, XOR',
   'Combinational circuits: adders, multiplexers, decoders',
   'Flip-flops: SR, D, JK, T',
   'Registers and shift registers',
   'Counters: synchronous and asynchronous',
   'ADC and DAC basics',
   'Memory: RAM and ROM basics',
   'Logic circuit project: Digital clock'
 ],
 ARRAY[
   'Logic circuit reference guide',
   'Truth table practice sheets',
   'Boolean algebra formula sheet',
   'Digital clock project guide'
 ],
 ARRAY['Basic electronics OR mathematics (Class 11)'],
 ARRAY['Laptop (for Logisim simulation software, free)', 'Digital trainer kit (trainer brings)'],
 'Logic ICs (7400 series: 7408, 7432, 7404, 7486),
  7-segment display, BCD decoder IC (7447),
  Counter IC (7490), Breadboard',
 true, false, false, 73),

('Electronics for Kids (8-14 Years) — Beginner',
 'Electronics', 'Beginner',
 'Children aged 8-14 years curious about electricity and gadgets',
 'Safe and fun electronics experiments for kids. Build real projects and understand electricity!',
 'Kids love to know how things work! This course introduces children to the exciting world of electronics through safe, age-appropriate hands-on experiments. Everything is explained in simple terms, and every session ends with a working project they can keep.',
 ARRAY[
   'What is electricity and how does it flow?',
   'Safety rules for working with electronics',
   'Building a simple circuit with battery and LED',
   'Making an LED blink without a microcontroller',
   'Buzzer alarm circuit',
   'Touch sensor light',
   'Traffic light project',
   'Night light with LDR',
   'Simple motor fan circuit',
   '5 fun projects to take home!'
 ],
 ARRAY[
   'Kids electronics activity book',
   'Safety guidelines poster',
   'Certificate of completion',
   'Parent guide for home experiments'
 ],
 ARRAY['None - suitable for complete beginners aged 8+'],
 ARRAY['No special tools needed - trainer brings everything'],
 'SAFE kids electronics kit: CR2032 coin cells (safe, low voltage),
  LEDs (pre-resistored), Buzzer, Simple motor, Touch sensor pad,
  LDR, Snap connectors (no soldering needed)',
 true, true, true, 74);

-- ============================================================
-- CATEGORY 5: ROBOTICS (5 Courses)
-- ============================================================

INSERT INTO public.courses (
  name, category, level, target_audience,
  short_description, full_description,
  what_you_learn, what_included,
  prerequisites, tools_required, hardware_kit,
  active, is_new, is_popular, sort_order
) VALUES

('Robotics Fundamentals — Beginner',
 'Robotics', 'Beginner',
 'Absolute beginners, school students (Grade 8+), curious learners',
 'Introduction to robotics: mechanisms, motors, sensors, and build your first robot!',
 'Robots are the future! This beginner robotics course introduces you to the world of robotics without requiring any electronics or coding background. You''ll learn about different types of robots, understand motors and sensors, and build your first working robot from the ground up.',
 ARRAY[
   'What is robotics and types of robots',
   'Degrees of freedom and robot kinematics (simple)',
   'How motors work: DC motors, servo motors, stepper motors',
   'Gears and mechanical advantage',
   'Sensors: ultrasonic, infrared, light sensors',
   'Power systems: batteries and motor drivers',
   'Robot chassis: building the mechanical structure',
   'Basic robot control without programming',
   'Line following concept introduction',
   'Building 3 beginner robot projects'
 ],
 ARRAY[
   'Robotics concept guide (illustrated)',
   'Motor and sensor reference sheet',
   'Assembly instruction manual for each robot',
   'Safety guide for working with motors'
 ],
 ARRAY['No prior experience needed - pure beginners welcome'],
 ARRAY['No laptop needed for this level', 'Enthusiasm!'],
 'DC motors (2x), Wheels and chassis frame, Battery holder (AA),
  On/Off switch, Motor controller (basic), LDR and LED,
  Jumper wires, Small breadboard',
 true, true, false, 80),

('Arduino Robotics — Intermediate',
 'Robotics', 'Intermediate',
 'Students with basic electronics or programming knowledge',
 'Build programmable robots with Arduino: line follower, obstacle avoider, and robotic arm.',
 'Arduino-based robotics is the most popular way to learn practical robotics. This course teaches you to program Arduino and use it to control robots with sensors and motors. By the end, you''ll have built 3 fully functional programmable robots.',
 ARRAY[
   'Arduino Uno: pins, power, digital vs analog',
   'Arduino IDE setup and first program (Blink)',
   'Digital I/O: controlling LEDs and reading buttons',
   'PWM for motor speed control',
   'Ultrasonic sensor (HC-SR04): distance measurement',
   'IR sensor for line detection',
   'L298N motor driver: forward, reverse, turn',
   'Servo motor control',
   'Bluetooth module (HC-05) for phone control',
   'Project 1: Line Follower Robot',
   'Project 2: Obstacle Avoiding Robot',
   'Project 3: Bluetooth Controlled Robot'
 ],
 ARRAY[
   'Arduino code files for all 3 projects',
   'Circuit diagrams for each project',
   'Arduino programming reference card',
   'Troubleshooting guide for common issues'
 ],
 ARRAY['Basic electronics understanding OR completed Basic Electronics course'],
 ARRAY['Laptop with Arduino IDE installed (free)'],
 'Arduino Uno, L298N Motor Driver, 2x DC Motors + Wheels,
  Chassis frame, Ultrasonic sensor (HC-SR04), IR sensors (2x),
  Servo motor (SG90), HC-05 Bluetooth module, 9V battery',
 true, true, true, 81),

('Advanced Robotics — Advanced',
 'Robotics', 'Advanced',
 'Arduino robotics practitioners ready for professional-level robotics',
 'Advanced robotics: PID control, computer vision integration, robotic arm, and ROS basics.',
 'This advanced robotics course takes you to the level of professional robotics systems. You''ll implement PID controllers for precision movement, integrate computer vision into robots, build a 3-DOF robotic arm, and get an introduction to ROS (Robot Operating System).',
 ARRAY[
   'PID control theory and implementation',
   'PID tuning for line follower robot (advanced)',
   'Encoder-based precise motor control',
   'Inverse kinematics for robotic arm',
   'Building a 3-DOF robotic arm',
   'Computer vision integration (OpenCV + camera)',
   'Color detection and object following robot',
   'Introduction to ROS (Robot Operating System)',
   'ROS nodes, topics, and messages',
   'Mapping and localization concepts',
   'Capstone: Autonomous robot project'
 ],
 ARRAY[
   'PID tuning worksheet',
   'ROS installation guide',
   'Kinematics reference material',
   'Capstone project documentation template'
 ],
 ARRAY['Arduino Robotics course OR equivalent experience', 'Python basics helpful'],
 ARRAY['Laptop with ROS (Ubuntu recommended or VirtualBox)', 'Arduino IDE'],
 'Arduino Mega, Encoder motors (2x), Servo set (3x for arm),
  Arm structural parts, Raspberry Pi (optional),
  Camera module, Advanced sensors',
 true, true, false, 82),

('Robotics for Kids (8-14 Years) — Beginner',
 'Robotics', 'Beginner',
 'Children aged 8-14 who love robots and want to build them',
 'Build fun robots and learn programming through play! No experience needed.',
 'Every child loves robots! This course makes robotics education exciting and age-appropriate. Children build real robots that move, respond to their environment, and can be programmed using simple visual programming tools. Safe, fun, and educational!',
 ARRAY[
   'Introduction to robots and their uses in real life',
   'How motors make robots move',
   'Understanding sensors: how robots "feel" and "see"',
   'Visual block programming (Scratch-based)',
   'Making a robot move forward and turn',
   'Programming a robot to avoid obstacles',
   'Adding sounds and lights to robots',
   'Line following challenge',
   'Robot obstacle course competition',
   'Final project: Your own robot program!'
 ],
 ARRAY[
   'Kids robotics activity guidebook',
   'Programming card set (visual reference)',
   'Achievement badges for each project',
   'Certificate of completion'
 ],
 ARRAY['None - pure beginners aged 8+ welcome'],
 ARRAY['No laptop needed (optional for programming module)', 'Enthusiasm!'],
 'Kids-safe robotics kit: Colorful plastic chassis,
  Safe DC motors, LED lights, Buzzer, IR sensors,
  Simple controller board (no sharp edges),
  USB cable for programming',
 true, true, true, 83),

('Drone Technology — Advanced',
 'Robotics', 'Advanced',
 'Robotics enthusiasts, aerospace aspirants, advanced hobbyists',
 'Learn drone mechanics, flight controllers, FPV racing, GPS waypoints, and autonomous flight.',
 'Drones are revolutionizing photography, agriculture, delivery, and military applications. This advanced course teaches you to build, configure, and program drones from scratch. You''ll understand flight physics, configure flight controllers, set up FPV systems, and program autonomous waypoint missions.',
 ARRAY[
   'Drone aerodynamics: thrust, lift, drag, torque',
   'Quadcopter frame selection and motor sizing',
   'ESC (Electronic Speed Controller) setup',
   'Flight controller (Pixhawk) configuration with Mission Planner',
   'Radio transmitter and receiver setup',
   'FPV camera and video transmitter setup',
   'GPS waypoint mission programming',
   'Autonomous flight modes',
   'Computer vision for drone applications',
   'Drone racing basics and FPV goggle usage',
   'Indian DGCA drone regulations and safety',
   'Building and flying your own drone'
 ],
 ARRAY[
   'Drone build checklist',
   'Mission Planner configuration guide',
   'DGCA regulations summary',
   'FPV setup guide',
   'Autonomous mission programming tutorial'
 ],
 ARRAY['Advanced Electronics OR Arduino Robotics course', 'Strong technical aptitude'],
 ARRAY['Laptop with Mission Planner', 'FPV goggles (trainer demonstration set)'],
 'F450 Quadcopter frame, A2212 Brushless motors (4x),
  30A ESC (4x), Pixhawk flight controller, GPS module,
  RC transmitter + receiver, LiPo battery (3S 3300mAh),
  LiPo charger, Propellers, FPV camera kit',
 true, true, false, 84);

-- ============================================================
-- CATEGORY 6: IoT — INTERNET OF THINGS (5 Courses)
-- ============================================================

INSERT INTO public.courses (
  name, category, level, target_audience,
  short_description, full_description,
  what_you_learn, what_included,
  prerequisites, tools_required, hardware_kit,
  active, is_new, is_popular, sort_order
) VALUES

('IoT Fundamentals — Beginner',
 'IoT', 'Beginner',
 'Beginners curious about smart devices and home automation',
 'Learn IoT from scratch: connect physical devices to the internet and control them from anywhere.',
 'The Internet of Things connects physical devices to the internet — smart homes, smart cities, wearables, and industrial automation. This beginner IoT course teaches you to build connected devices using NodeMCU (ESP8266), a WiFi-enabled microcontroller. No prior electronics needed.',
 ARRAY[
   'What is IoT and the IoT ecosystem',
   'NodeMCU ESP8266: introduction and pinout',
   'Arduino IDE setup for NodeMCU',
   'Connecting NodeMCU to WiFi',
   'Reading temperature and humidity (DHT11)',
   'Controlling LED from your smartphone (Blynk app)',
   'Sending sensor data to Blynk dashboard',
   'Email alerts when temperature exceeds threshold',
   'Project 1: Smart temperature monitor',
   'Project 2: Smart home LED controller',
   'Project 3: Plant watering status alert'
 ],
 ARRAY[
   'NodeMCU getting started guide',
   'Blynk setup tutorial',
   'Circuit diagrams for all 3 projects',
   'Code files with explanations',
   'Troubleshooting guide'
 ],
 ARRAY['Basic computer skills', 'No electronics experience needed'],
 ARRAY['Laptop with Arduino IDE', 'Smartphone with Blynk app (free)'],
 'NodeMCU ESP8266, DHT11 temperature/humidity sensor,
  LED set, Resistors, Jumper wires, Breadboard,
  Micro USB cable, 5V power adapter',
 true, true, true, 90),

('IoT with Arduino — Intermediate',
 'IoT', 'Intermediate',
 'Electronics or Arduino enthusiasts stepping into IoT',
 'Advanced IoT with Arduino + ESP8266, cloud platforms, MQTT, and home automation.',
 'This intermediate IoT course teaches you to build sophisticated connected systems using Arduino combined with ESP8266. You''ll work with cloud IoT platforms, learn the MQTT protocol used in industry, and build real home automation projects.',
 ARRAY[
   'Arduino + ESP8266 (AT commands and programming)',
   'ThingSpeak cloud platform: send and visualize data',
   'MQTT protocol: broker, publisher, subscriber',
   'Mosquitto MQTT broker setup',
   'Multiple sensor integration',
   'Relay module for controlling AC appliances',
   'PIR motion sensor for security systems',
   'Project 1: Smart home automation system',
   'Project 2: IoT weather station (public dashboard)',
   'Project 3: Plant watering automation',
   'Project 4: IoT security alarm with phone notification'
 ],
 ARRAY[
   'MQTT protocol guide',
   'ThingSpeak setup tutorial',
   'Relay wiring safety guide',
   'All project code files',
   'Circuit diagrams'
 ],
 ARRAY['Arduino basics or Basic Electronics knowledge'],
 ARRAY['Laptop', 'Arduino IDE', 'WiFi internet connection for cloud'],
 'Arduino Uno, ESP8266 WiFi module, DHT22 sensor (better than DHT11),
  Soil moisture sensor, Relay module (2-channel), PIR motion sensor,
  OLED display (0.96"), Servo motor, Buzzer',
 true, true, false, 91),

('IoT with Raspberry Pi — Intermediate',
 'IoT', 'Intermediate',
 'Tech enthusiasts wanting a Linux-powered IoT platform',
 'Build powerful IoT systems with Raspberry Pi, Python, and camera-based applications.',
 'Raspberry Pi is a full Linux computer the size of a credit card. This intermediate course teaches you to use Raspberry Pi for advanced IoT applications including real-time computer vision, web dashboards, and intelligent automation systems.',
 ARRAY[
   'Raspberry Pi setup: OS installation and configuration',
   'Linux basics for Raspberry Pi',
   'Python GPIO programming',
   'LED, button, and sensor control with Python',
   'Camera module: capture photos and video',
   'Basic face detection with OpenCV',
   'Motion detection security camera',
   'Real-time data visualization (web dashboard)',
   'Sending sensor data to cloud (MQTT/HTTP)',
   'Project 1: Smart security camera with alerts',
   'Project 2: Home monitoring dashboard',
   'Project 3: Face recognition door system (concept)'
 ],
 ARRAY[
   'Raspberry Pi setup guide',
   'Python GPIO reference',
   'OpenCV face detection code',
   'Web dashboard template',
   'All project source code'
 ],
 ARRAY['Python basics OR any programming experience', 'Basic Linux helpful'],
 ARRAY['Laptop (for SSH into Pi)', 'MicroSD card 16GB+', 'Monitor/keyboard for initial setup'],
 'Raspberry Pi 4 (2GB), Camera Module v2, PIR motion sensor,
  DHT22 sensor, Relay module, LEDs and resistors,
  MicroSD card 32GB, 5V 3A power supply, Case for Pi',
 true, true, false, 92),

('Industrial IoT — Advanced',
 'IoT', 'Advanced',
 'Engineers and professionals interested in Industry 4.0 and industrial automation',
 'Industrial IoT: protocols, edge computing, cloud platforms, and Industry 4.0 applications.',
 'Industrial IoT (IIoT) is transforming manufacturing, logistics, and infrastructure. This advanced course covers industrial-grade IoT implementation including standard protocols (MQTT, Modbus), edge computing, cloud integration with AWS IoT or Azure IoT Hub, and SCADA basics.',
 ARRAY[
   'Industrial IoT vs Consumer IoT',
   'Industrial communication protocols: Modbus, OPC-UA',
   'MQTT for industrial applications (QoS levels)',
   'Edge computing: concept and implementation',
   'Gateway devices and edge intelligence',
   'AWS IoT Core: thing registry, rules, shadows',
   'Azure IoT Hub: device management, telemetry',
   'Node-RED for IoT workflow automation',
   'SCADA systems: concept and software intro',
   'Industrial sensor networks and fieldbus',
   'Industry 4.0: digital twin concept',
   'Capstone: Industrial monitoring dashboard'
 ],
 ARRAY[
   'AWS IoT setup guide',
   'Azure IoT Hub tutorial',
   'Node-RED workflow examples',
   'Protocol comparison reference',
   'Industry 4.0 whitepaper (simplified)'
 ],
 ARRAY['IoT Intermediate level OR equivalent', 'Python or any programming language'],
 ARRAY['Laptop', 'AWS/Azure free tier account', 'Node-RED installed (free)'],
 'Modbus sensor module, Industrial temperature sensor (PT100),
  RS485 converter, Edge computing device (Raspberry Pi or similar)',
 true, false, false, 93),

('IoT for Kids (8-14 Years) — Beginner',
 'IoT', 'Beginner',
 'Children aged 8-14 who want to make things smart and connected',
 'Make gadgets smart! Kids build fun IoT projects with lights, sensors, and smartphone control.',
 'Imagine controlling your room light from your phone or getting a message when someone enters your room! This kids IoT course teaches children to create smart devices through fun, age-appropriate experiments. Every project is designed to be cool, safe, and educational.',
 ARRAY[
   'What makes things "smart" (IoT explained for kids)',
   'How WiFi and the internet work (simple explanation)',
   'Setting up a beginner microcontroller',
   'Making an LED blink (the Hello World of hardware)',
   'Controlling lights from your phone',
   'Reading room temperature and showing on phone',
   'Making a smart alarm (motion detection)',
   'Plant watering reminder system',
   'Send WhatsApp message from a device!',
   'Final project: Your own smart gadget'
 ],
 ARRAY[
   'Kids IoT activity book',
   'Parent setup guide',
   'Safe usage guidelines',
   'Completion certificate'
 ],
 ARRAY['None - suitable for children 8+ years'],
 ARRAY['Smartphone (parent''s phone for app setup)', 'Laptop (parent helps with setup)'],
 'Safe kids IoT kit: USB-powered microcontroller (no mains electricity),
  Pre-wired LED module, Temperature sensor (sealed safe),
  Motion sensor module, USB power bank, Snap connectors',
 true, true, true, 94);

-- ============================================================
-- CATEGORY 7: SPOKEN ENGLISH (5 Courses)
-- ============================================================

INSERT INTO public.courses (
  name, category, level, target_audience,
  short_description, full_description,
  what_you_learn, what_included,
  prerequisites, tools_required,
  active, is_new, is_popular, sort_order
) VALUES

('Spoken English — Beginner',
 'Spoken English', 'Beginner',
 'Anyone who wants to start speaking English confidently from scratch',
 'Build English speaking confidence from zero. No English background needed.',
 'Millions of people in India know English grammar but cannot speak fluently. This beginner course focuses entirely on speaking confidence. The trainer creates a comfortable, judgment-free environment where you practice English conversation every single session.',
 ARRAY[
   'Overcoming fear of speaking English',
   'Basic vocabulary: 500 most-used English words',
   'Simple sentence formation: Subject + Verb + Object',
   'Introducing yourself confidently',
   'Daily conversations: greetings, shopping, asking directions',
   'Pronunciation fundamentals: vowel and consonant sounds',
   'Common mistakes Tamil/Kannada speakers make (and how to fix them)',
   'Present and past tense in conversation',
   'Listening skills: understanding native speakers',
   'Practice dialogues for everyday situations'
 ],
 ARRAY[
   'Vocabulary cards (500 words)',
   'Daily conversation scripts',
   'Pronunciation guide (Tamil/English phonetics comparison)',
   'Practice dialogue booklet',
   'Daily practice exercises'
 ],
 ARRAY['No English background needed - absolute beginners welcome'],
 ARRAY['Notebook', 'Willingness to speak and practice'],
 true, true, true, 100),

('Spoken English — Intermediate',
 'Spoken English', 'Intermediate',
 'People who can speak basic English but want fluency and grammar accuracy',
 'Improve English fluency, correct grammar, and professional communication skills.',
 'If you know some English but get stuck mid-sentence, make grammar mistakes, or lack confidence in professional settings, this intermediate course is for you. The trainer focuses on fluency, accuracy, and natural-sounding English.',
 ARRAY[
   'Tenses mastery in conversation (not just theory)',
   'Active vs Passive voice in speaking',
   'Conditionals in conversation (if-then situations)',
   'Professional email and phone call language',
   'Presentation skills in English',
   'Group discussion techniques',
   'Idioms and phrasal verbs in context',
   'Reading comprehension and spoken response',
   'Pronunciation: stress, intonation, connected speech',
   'Mock conversations: job interview, formal meetings'
 ],
 ARRAY[
   'Grammar quick reference (conversational focus)',
   'Idioms and phrasal verbs booklet',
   'Presentation structure templates',
   'Audio pronunciation examples (QR code links)',
   'Practice scenario scripts'
 ],
 ARRAY['Ability to speak basic English sentences'],
 ARRAY['Notebook', 'Smartphone (for audio practice)'],
 true, true, false, 101),

('Spoken English — Advanced',
 'Spoken English', 'Advanced',
 'Professionals and students who want native-like fluency and public speaking skills',
 'Master advanced English: public speaking, debate, negotiations, and interview confidence.',
 'This advanced course is for people who can speak good English but want to sound truly professional and confident in high-stakes situations: job interviews, client presentations, debates, and international communication.',
 ARRAY[
   'Public speaking techniques and stage confidence',
   'Debate skills: argument construction and rebuttal',
   'Negotiation language for business',
   'Advanced vocabulary for professional contexts',
   'Accent reduction and clarity improvement',
   'Storytelling and narrative skills',
   'Handling questions and interruptions gracefully',
   'Email writing: formal, persuasive, and diplomatic',
   'Mock job interviews (with recorded feedback)',
   'Group discussion practice with scoring'
 ],
 ARRAY[
   'Advanced vocabulary builder',
   'Public speaking structure guide',
   'Interview question bank with model answers',
   'Debate topic resource book',
   'Personal feedback on recorded speaking practice'
 ],
 ARRAY['Intermediate English or existing conversational ability'],
 ARRAY['Smartphone for video recording practice', 'Notebook'],
 true, true, false, 102),

('Business English — Advanced',
 'Spoken English', 'Advanced',
 'Working professionals, MBA students, corporate employees',
 'Professional Business English for the corporate world: meetings, emails, and presentations.',
 'Business English is a specialized skill that can transform your corporate career. This course teaches you the language and communication skills used in professional environments — meetings, client calls, email writing, and cross-cultural communication.',
 ARRAY[
   'Professional email writing: tone, structure, formats',
   'Business meeting language: opening, discussing, closing',
   'Conference call etiquette and phrases',
   'Presentation delivery for corporate audiences',
   'Report writing in English',
   'Negotiation language: proposing, countering, agreeing',
   'Business small talk and networking conversation',
   'Cross-cultural communication awareness',
   'Handling complaints and difficult customers',
   'Business storytelling and persuasion'
 ],
 ARRAY[
   'Business email templates (20+ templates)',
   'Meeting language reference card',
   'Presentation structure guide',
   'Corporate vocabulary builder',
   'Practice scenario transcripts'
 ],
 ARRAY['Good conversational English', 'Working professional or student preferred'],
 ARRAY['Laptop (for email writing practice)', 'Notebook'],
 true, false, false, 103),

('IELTS Preparation — Advanced',
 'Spoken English', 'Advanced',
 'Students and professionals planning to study or work abroad',
 'Complete IELTS preparation: Speaking, Writing, Reading, and Listening with target band score strategy.',
 'IELTS is required for studying in UK, Australia, Canada, and many other countries. This comprehensive preparation course covers all 4 modules with exam strategy, band score improvement techniques, and extensive practice with real exam-format questions.',
 ARRAY[
   'IELTS format overview and band score understanding',
   'Speaking Module: Part 1, Part 2 (cue card), Part 3',
   'Writing Task 1: Graph, chart, diagram description',
   'Writing Task 2: Essay types and structures',
   'Reading: skimming, scanning, true/false/NG questions',
   'Listening: identifying distractors, note completion',
   'Academic vocabulary for IELTS',
   'Time management strategies per module',
   'Mock tests with feedback',
   'Common mistakes and how to avoid them'
 ],
 ARRAY[
   'IELTS band descriptor guide',
   'Writing task templates (Task 1 and Task 2)',
   'Vocabulary for academic writing',
   'Practice question papers (10 sets)',
   'Speaking cue card practice set (50 topics)',
   'Personal feedback on practice essays'
 ],
 ARRAY['Good English conversational ability', 'Target band 6.5 or above'],
 ARRAY['Notebook', 'Internet (for IELTS practice resources)'],
 true, true, false, 104);

-- ============================================================
-- CATEGORY 8: COMPETITIVE EXAMS (4 Courses)
-- ============================================================

INSERT INTO public.courses (
  name, category, level, target_audience,
  short_description, full_description,
  what_you_learn, what_included,
  prerequisites, tools_required,
  active, is_new, is_popular, sort_order
) VALUES

('JEE Mains Preparation — Advanced',
 'Competitive Exams', 'Advanced',
 'Class 11 and 12 students targeting IITs and NITs',
 'Complete JEE Mains preparation: Physics, Chemistry, Mathematics with strategy and mock tests.',
 'JEE Mains is the gateway to NITs, IIITs, and other top engineering colleges. Our verified trainer provides personalized coaching for all three subjects with JEE-specific problem-solving techniques and exam strategy.',
 ARRAY[
   'Physics: mechanics, thermodynamics, electromagnetism, optics, modern physics',
   'Chemistry: Physical, Organic, and Inorganic complete',
   'Mathematics: calculus, algebra, coordinate geometry, probability',
   'JEE problem-solving techniques (not just concepts)',
   'Time management in 3-hour exam',
   'Marking scheme strategy (negative marking awareness)',
   'Mock test analysis and error correction',
   'Rank estimation techniques'
 ],
 ARRAY[
   'JEE formula sheets (Physics, Chemistry, Mathematics)',
   'Chapter-wise MCQ banks (500+ questions)',
   'Previous year JEE papers (10 years)',
   'Mock test papers (5 full tests)',
   'Error log template',
   'Rank predictor guide'
 ],
 ARRAY['Class 11-12 Physics, Chemistry, Mathematics', 'Strong Class 10 foundation'],
 ARRAY['Scientific calculator', 'Notebook', 'NCERT textbooks'],
 true, true, false, 110),

('NEET Preparation — Advanced',
 'Competitive Exams', 'Advanced',
 'Class 11 and 12 students targeting MBBS and medical colleges',
 'Complete NEET preparation: Biology, Physics, and Chemistry with NEET-specific strategy.',
 'NEET is the national medical entrance exam for MBBS and BDS admissions. Our trainer provides comprehensive NEET coaching with special focus on Biology (which carries maximum marks), NCERT mastery, and MCQ techniques.',
 ARRAY[
   'Biology: Botany and Zoology complete NCERT coverage',
   'High-value topics: Genetics, Ecology, Human Physiology',
   'NEET-level diagram questions and how to score full marks',
   'Physics: mechanics, electricity, optics (NEET level)',
   'Chemistry: Organic reactions, Physical chemistry numericals',
   'NEET MCQ solving techniques',
   'NCERT sentence-level mastery strategy',
   'Revision schedule for last 2 months',
   'Mock NEET test analysis'
 ],
 ARRAY[
   'Biology diagram practice booklet',
   'NEET MCQ question bank (1000+ Biology)',
   'Previous year NEET papers (10 years)',
   'NCERT important lines highlighter guide',
   'Mock tests (5 full tests)',
   'Chemistry reaction summary sheets'
 ],
 ARRAY['Class 11-12 Biology, Physics, Chemistry', 'Strong Class 10 science'],
 ARRAY['NCERT textbooks (mandatory)', 'Scientific calculator', 'Notebook'],
 true, true, false, 111),

('TNPSC Group 2 & 4 Preparation — Intermediate',
 'Competitive Exams', 'Intermediate',
 'Tamil Nadu government job aspirants',
 'Complete TNPSC Group 2 and Group 4 preparation covering all subjects and Tamil Nadu GK.',
 'TNPSC exams are the gateway to Tamil Nadu government jobs. This course covers the complete syllabus for Group 2 (Combined Civil Services) and Group 4 examinations with special focus on Tamil Nadu history, polity, and current affairs.',
 ARRAY[
   'General Studies: History (India and Tamil Nadu)',
   'Geography: India and Tamil Nadu focus',
   'Indian Polity and Constitution',
   'Tamil Nadu economy and government schemes',
   'Science: Physics, Chemistry, Biology basics',
   'Aptitude: Number series, ratio, percentage',
   'Current Affairs: last 6 months with revision',
   'Tamil Eligibility Test (SET) preparation',
   'Previous year TNPSC paper analysis',
   'Mock test with TNPSC exam pattern'
 ],
 ARRAY[
   'Tamil Nadu GK comprehensive notes',
   'Current affairs monthly digest',
   'Previous year question papers (5 years)',
   'Mock test papers',
   'Tamil Nadu scheme and initiative list'
 ],
 ARRAY['10th or 12th qualification (as per exam requirement)'],
 ARRAY['Notebook', 'Tamil Nadu maps and charts'],
 true, true, false, 112),

('Bank Exam Preparation (IBPS/SBI) — Intermediate',
 'Competitive Exams', 'Intermediate',
 'Graduates preparing for bank PO, clerk, and SO examinations',
 'Complete bank exam preparation: Quantitative Aptitude, Reasoning, English, and Banking Awareness.',
 'Bank exams (IBPS PO, SBI PO, IBPS Clerk, SBI Clerk) are among the most competitive government exams in India. This course covers all sections systematically with shortcut techniques, time management, and extensive practice.',
 ARRAY[
   'Quantitative Aptitude: Number system, percentages, profit-loss',
   'Time and work, time-speed-distance',
   'Data interpretation: tables, graphs, charts',
   'Reasoning: Coding-decoding, blood relations, puzzles',
   'Seating arrangement and direction sense',
   'English: Reading comprehension, error spotting',
   'Cloze test and fill in the blanks',
   'Banking awareness: RBI, banking terms, financial',
   'Current affairs for banking',
   'Computer awareness basics',
   'Mock tests in exact exam format'
 ],
 ARRAY[
   'Aptitude shortcut formula sheet',
   'Reasoning tricks guide',
   'Banking awareness capsule',
   'Previous year papers (5 years)',
   'Mock tests (10 sectional + 5 full)',
   'Current affairs monthly update'
 ],
 ARRAY['Graduation in any discipline', 'Basic mathematics (10th level)'],
 ARRAY['Calculator (for practice only, not exam)', 'Notebook'],
 true, false, false, 113);

-- ============================================================
-- INSERT COURSE PLANS FOR ALL 42 COURSES
-- ============================================================

-- Standard plans for School/English/Competitive Exam courses
INSERT INTO public.course_plans
  (course_id, plan_name, display_name, price, original_price,
   sessions_per_week, hours_per_session, duration_weeks,
   features, not_included, is_popular, sort_order)
SELECT
  c.id,
  'basic',
  'Basic Plan',
  1999,
  2499,
  2,
  1.0,
  12,
  ARRAY[
    '2 sessions per week (1 hr each)',
    '8 sessions per month',
    'Study notes provided',
    'WhatsApp doubt support',
    'Monthly progress report'
  ],
  ARRAY[
    'Practice sets',
    'Completion certificate'
  ],
  false,
  1
FROM public.courses c
WHERE c.category IN (
  'School Subjects', 'Spoken English', 'Competitive Exams'
);

INSERT INTO public.course_plans
  (course_id, plan_name, display_name, price, original_price,
   sessions_per_week, hours_per_session, duration_weeks,
   features, not_included, is_popular, sort_order)
SELECT
  c.id,
  'standard',
  'Standard Plan',
  3499,
  4499,
  3,
  1.0,
  10,
  ARRAY[
    '3 sessions per week (1 hr each)',
    '12 sessions per month',
    'Notes + practice worksheets',
    'Priority WhatsApp support',
    'Bi-weekly progress reports',
    'Doubt clearing sessions',
    'Exam strategy guidance'
  ],
  ARRAY[
    'Completion certificate'
  ],
  true,
  2
FROM public.courses c
WHERE c.category IN (
  'School Subjects', 'Spoken English', 'Competitive Exams'
);

INSERT INTO public.course_plans
  (course_id, plan_name, display_name, price, original_price,
   sessions_per_week, hours_per_session, duration_weeks,
   features, not_included, is_popular, sort_order)
SELECT
  c.id,
  'advanced',
  'Advanced Plan',
  5999,
  7499,
  4,
  1.5,
  8,
  ARRAY[
    '4 sessions per week (1.5 hrs each)',
    '16 sessions per month',
    'All study materials included',
    'Weekly progress reports',
    'Priority doubt clearing',
    'Mock tests and assessments',
    'Completion certificate',
    'Exam/career guidance session'
  ],
  ARRAY[]::TEXT[],
  false,
  3
FROM public.courses c
WHERE c.category IN (
  'School Subjects', 'Spoken English', 'Competitive Exams'
);

-- Programming/AI courses plans (slightly higher)
INSERT INTO public.course_plans
  (course_id, plan_name, display_name, price, original_price,
   sessions_per_week, hours_per_session, duration_weeks,
   features, not_included, is_popular, sort_order)
SELECT
  c.id,
  'basic',
  'Basic Plan',
  2499,
  2999,
  2,
  1.0,
  12,
  ARRAY[
    '2 coding sessions per week',
    'Trainer brings laptop for demos',
    'Code files after each session',
    'WhatsApp support for bugs',
    'Monthly progress report'
  ],
  ARRAY[
    'Project portfolio review',
    'Certificate'
  ],
  false,
  1
FROM public.courses c
WHERE c.category IN ('Programming', 'AI & ML');

INSERT INTO public.course_plans
  (course_id, plan_name, display_name, price, original_price,
   sessions_per_week, hours_per_session, duration_weeks,
   features, not_included, is_popular, sort_order)
SELECT
  c.id,
  'standard',
  'Standard Plan',
  3999,
  4999,
  3,
  1.0,
  10,
  ARRAY[
    '3 sessions per week',
    'Live coding with trainer',
    'Code files + exercise problems',
    'Project guidance included',
    'Priority WhatsApp support',
    'Bi-weekly assessment',
    'GitHub portfolio setup help'
  ],
  ARRAY[
    'Certificate'
  ],
  true,
  2
FROM public.courses c
WHERE c.category IN ('Programming', 'AI & ML');

INSERT INTO public.course_plans
  (course_id, plan_name, display_name, price, original_price,
   sessions_per_week, hours_per_session, duration_weeks,
   features, not_included, is_popular, sort_order)
SELECT
  c.id,
  'advanced',
  'Advanced Plan',
  6999,
  8999,
  4,
  1.5,
  8,
  ARRAY[
    '4 sessions per week (1.5 hrs)',
    'Complete project development',
    'Code review and optimization',
    'Portfolio project guidance',
    'Interview prep (DSA/coding)',
    'Industry mentor session',
    'Completion certificate',
    'LinkedIn profile review'
  ],
  ARRAY[]::TEXT[],
  false,
  3
FROM public.courses c
WHERE c.category IN ('Programming', 'AI & ML');

-- Electronics/Robotics/IoT plans (higher — hardware included)
INSERT INTO public.course_plans
  (course_id, plan_name, display_name, price, original_price,
   sessions_per_week, hours_per_session, duration_weeks,
   features, not_included, is_popular, sort_order)
SELECT
  c.id,
  'basic',
  'Basic Plan',
  4999,
  5999,
  2,
  1.5,
  8,
  ARRAY[
    '2 sessions per week (1.5 hrs each)',
    'Hardware kit brought by trainer',
    'Hands-on experiments every session',
    'Component guide and diagrams',
    'WhatsApp support'
  ],
  ARRAY[
    'You keep the hardware kit',
    'Certificate'
  ],
  false,
  1
FROM public.courses c
WHERE c.category IN ('Electronics', 'Robotics', 'IoT');

INSERT INTO public.course_plans
  (course_id, plan_name, display_name, price, original_price,
   sessions_per_week, hours_per_session, duration_weeks,
   features, not_included, is_popular, sort_order)
SELECT
  c.id,
  'standard',
  'Standard Plan',
  7999,
  9999,
  2,
  2.0,
  10,
  ARRAY[
    '2 sessions per week (2 hrs each)',
    'Hardware kit included (yours to keep!)',
    'Complete project builds',
    'Experiment notes and circuit diagrams',
    'Priority support',
    'Take-home projects',
    'Bi-weekly assessment'
  ],
  ARRAY[
    'Certificate'
  ],
  true,
  2
FROM public.courses c
WHERE c.category IN ('Electronics', 'Robotics', 'IoT');

INSERT INTO public.course_plans
  (course_id, plan_name, display_name, price, original_price,
   sessions_per_week, hours_per_session, duration_weeks,
   features, not_included, is_popular, sort_order)
SELECT
  c.id,
  'advanced',
  'Advanced Plan',
  12999,
  15999,
  3,
  2.0,
  10,
  ARRAY[
    '3 sessions per week (2 hrs each)',
    'Full hardware kit (yours to keep!)',
    'Advanced project development',
    'PCB/deployment included',
    'Portfolio project documentation',
    'Competition preparation',
    'Completion certificate',
    'Industry exposure session'
  ],
  ARRAY[]::TEXT[],
  false,
  3
FROM public.courses c
WHERE c.category IN ('Electronics', 'Robotics', 'IoT');

-- ============================================================
-- LAUNCH COUPONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE,
    description TEXT,
    discount_type TEXT NOT NULL,
    discount_value INTEGER NOT NULL,
    min_order_value INTEGER,
    max_discount INTEGER,
    max_uses INTEGER,
    first_time_only BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.coupons
  (code, description, discount_type, discount_value,
   min_order_value, max_discount, max_uses,
   first_time_only, active)
VALUES
('EDUDOOR50',
 'Launch Special: 50% off your first month',
 'percentage', 50, 1999, 2500, 1000, true, true),

('WELCOME500',
 'Welcome gift: ₹500 flat off on any plan',
 'flat', 500, 1999, NULL, 2000, true, true),

('CBE100',
 'Coimbatore Launch Offer: ₹100 off',
 'flat', 100, 1999, NULL, 500, false, true),

('CHN200',
 'Chennai Special: ₹200 off',
 'flat', 200, 1999, NULL, 500, false, true),

('BLR300',
 'Bangalore Launch: ₹300 off',
 'flat', 300, 2499, NULL, 500, false, true),

('MDU100',
 'Madurai Launch: ₹100 off',
 'flat', 100, 1999, NULL, 300, false, true),

('TRY100',
 'Trichy Launch: ₹100 off',
 'flat', 100, 1999, NULL, 300, false, true),

('STEM25',
 '25% off on Electronics, Robotics, and IoT courses',
 'percentage', 25, 4999, 3000, 200, false, true),

('CODING20',
 '20% off on all Programming and AI courses',
 'percentage', 20, 2499, 1500, 300, false, true),

('REFER500',
 'Referral reward: ₹500 off when referred by a friend',
 'flat', 500, 1999, NULL, 10000, false, true),

('FIRSTHW',
 'First hardware course: ₹1000 off',
 'flat', 1000, 4999, NULL, 100, true, true),

('SCHOOL30',
 '30% off on all school subject courses',
 'percentage', 30, 1999, 1500, 400, false, true)
ON CONFLICT (code) DO NOTHING;
