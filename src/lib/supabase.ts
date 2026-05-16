// src/lib/supabase.ts
// Complete Mock Supabase client for frontend-only MVP with LocalStorage persistence

const INITIAL_DATA: Record<string, any[]> = {
  users: [],
  student_profiles: [],
  trainer_profiles: [],
  student_gamification: [],
  notifications: [],
  courses: [
    {
      id: 1,
      title: "Young Robotics Engineers",
      category: "Robotics",
      description: "A comprehensive journey into the world of robotics, from basic electronics to AI-integrated machines.",
      price: "₹2026/mo",
      original_price: "₹2,499",
      rating: 4.8,
      students: 1200,
      duration: "8 Levels",
      diff: "Beginner to Advanced",
      image_url: "/assets/courses/robotics_eng.png",
      levels: [
        { level: 1, title: "Robotics Foundations", topics: ["Introduction to Robots", "Basic Electronics", "Simple Circuit Activities", "Robot Safety & Basics"] },
        { level: 2, title: "Smart Circuits & Components", topics: ["LEDs & Sensors", "Motors & Batteries", "Breadboard Practice", "Mini Electronic Projects"] },
        { level: 3, title: "Beginner Coding with Arduino", topics: ["Arduino Introduction", "Basic Coding Logic", "LED Programming", "Input & Output Concepts"] },
        { level: 4, title: "Robot Building Essentials", topics: ["Robot Chassis Assembly", "Motor Driver Setup", "Wiring & Power Connections", "First Moving Robot"] },
        { level: 5, title: "Sensor-Based Robotics", topics: ["Ultrasonic Sensors", "IR Sensors", "Obstacle Detection", "Line Following Robot"] },
        { level: 6, title: "Automation & Smart Robotics", topics: ["Bluetooth Robotics", "Remote-Controlled Robots", "Automation Concepts", "Smart Device Integration"] },
        { level: 7, title: "AI & Future Technologies", topics: ["Introduction to AI", "AI in Robotics", "Smart Machines", "Innovation & Design Thinking"] },
        { level: 8, title: "Innovation Master Project", topics: ["Advanced Robot Creation", "Team Innovation Challenge", "Real-world Problem Solving", "Final Robotics Presentation", "Certification Project"] }
      ]
    },
    {
      id: 2,
      title: "Young Electronics Innovators",
      category: "Electronics",
      description: "Learn the core principles of electronics and build smart circuits and IoT-enabled devices.",
      price: "₹2026/mo",
      original_price: "₹1,999",
      rating: 4.7,
      students: 850,
      duration: "8 Levels",
      diff: "Beginner",
      image_url: "/assets/courses/electronics_innov.png",
      levels: [
        { level: 1, title: "Electronics Foundations", topics: ["Introduction to Electronics", "Understanding Electricity", "Simple Circuits", "Electronic Safety Basics"] },
        { level: 2, title: "Components & Circuit Design", topics: ["Resistors & LEDs", "Switches & Buzzers", "Breadboard Practice", "Circuit Building Activities"] },
        { level: 3, title: "Power & Energy Systems", topics: ["Batteries & Voltage", "Current Flow Concepts", "Power Supply Basics", "Energy Applications"] },
        { level: 4, title: "Smart Electronic Projects", topics: ["Light Sensor Projects", "Smart Alarm Systems", "Automatic LED Systems", "Electronic Creativity Projects"] },
        { level: 5, title: "Arduino & Embedded Electronics", topics: ["Arduino Introduction", "Basic Programming", "Electronic Automation", "Sensor Connections"] },
        { level: 6, title: "Sensors & Smart Devices", topics: ["Ultrasonic Sensor", "IR Sensor", "Temperature Sensor", "Smart Electronics Integration"] },
        { level: 7, title: "IoT & Future Electronics", topics: ["Internet of Things Basics", "Smart Home Concepts", "Wireless Electronics", "Future Technology Systems"] },
        { level: 8, title: "Innovation & Final Prototype", topics: ["Advanced Electronic Project", "Team Innovation Challenge", "Real-world Applications", "Product Presentation", "Certification Project"] }
      ]
    },
    {
      id: 3,
      title: "Young Embedded Systems Engineers",
      category: "Embedded Systems",
      description: "Dive deep into microcontrollers and build intelligent, connected systems using Arduino and sensors.",
      price: "₹2026/mo",
      original_price: "₹2,999",
      rating: 4.9,
      students: 420,
      duration: "8 Levels",
      diff: "Intermediate",
      image_url: "/assets/courses/embedded_sys.png",
      levels: [
        { level: 1, title: "Embedded Systems Foundations", topics: ["What is an Embedded System?", "Everyday Smart Devices", "Introduction to Microcontrollers", "Electronics Safety Basics"] },
        { level: 2, title: "Basic Electronics & Circuits", topics: ["Current, Voltage & Power", "LEDs & Resistors", "Breadboard Connections", "Circuit Building Practice"] },
        { level: 3, title: "Arduino Programming Basics", topics: ["Arduino Introduction", "Installing Arduino IDE", "Basic Coding Concepts", "LED & Buzzer Programming"] },
        { level: 4, title: "Sensors & Input Devices", topics: ["IR Sensor", "Ultrasonic Sensor", "Temperature Sensor", "Sensor Data Reading"] },
        { level: 5, title: "Output Devices & Automation", topics: ["Servo Motors", "DC Motors", "Relay Modules", "Smart Automation Projects"] },
        { level: 6, title: "Smart Embedded Projects", topics: ["Smart Home Mini Projects", "Obstacle Detection System", "Automatic Lighting System", "Embedded Logic Building"] },
        { level: 7, title: "IoT & Intelligent Systems", topics: ["Introduction to IoT", "WiFi & Bluetooth Modules", "Smart Connected Devices", "AI in Embedded Systems"] },
        { level: 8, title: "Innovation & Final Prototype", topics: ["Real-world Embedded Project", "Team Innovation Challenge", "Product Design Thinking", "Final Prototype Presentation", "Certification Project"] }
      ]
    },
    {
      id: 4,
      title: "Future Coders with Python",
      category: "Coding",
      description: "A fun and interactive introduction to coding using Python, the world's most popular programming language.",
      price: "₹2026/mo",
      original_price: "₹1,499",
      rating: 4.8,
      students: 2000,
      duration: "8 Levels",
      diff: "Beginner",
      image_url: "/assets/courses/python_coders.png",
      levels: [
        { level: 1, title: "Coding Foundations", topics: ["Introduction to Programming", "What is Python?", "Computer Logic Basics", "Fun Coding Activities"] },
        { level: 2, title: "Python Basics", topics: ["Variables & Data Types", "Input & Output", "Operators", "Simple Python Programs"] },
        { level: 3, title: "Logic Building", topics: ["Conditions & Loops", "Decision Making", "Pattern Activities", "Problem Solving Basics"] },
        { level: 4, title: "Functions & Creativity", topics: ["Functions in Python", "Reusable Code", "Mini Coding Challenges", "Creative Programs"] },
        { level: 5, title: "Games & Interactive Projects", topics: ["Quiz Game", "Number Guessing Game", "Calculator Project", "Interactive Python Activities"] },
        { level: 6, title: "Automation & Smart Coding", topics: ["File Handling", "Python Automation Basics", "Smart Mini Projects", "Productivity Tools"] },
        { level: 7, title: "AI & Future Technologies", topics: ["Introduction to AI", "Python for Artificial Intelligence", "Data & Smart Systems", "Future Tech Concepts"] },
        { level: 8, title: "Innovation & Final Project", topics: ["Real-world Python Project", "Team Innovation Challenge", "Project Presentation", "Creativity & Problem Solving", "Certification Project"] }
      ]
    },
    {
      id: 5,
      title: "Line Follower Making",
      category: "Robotics",
      description: "Build and program a robot that can navigate and track lines autonomously using IR sensors.",
      price: "₹2026/mo",
      original_price: "₹3,200",
      rating: 4.7,
      students: 600,
      duration: "8 Levels",
      diff: "Intermediate",
      image_url: "/assets/courses/line_follower.png",
      levels: [
        { level: 1, title: "Robotics Foundations", topics: ["Introduction to Line Follower Robots", "Understanding Robot Movements", "Basics of Electronics & Circuits", "Robot Safety"] },
        { level: 2, title: "Components & Sensors", topics: ["IR Sensor Basics", "Motors & Wheels", "Motor Driver Module", "Battery & Power Systems"] },
        { level: 3, title: "Circuit Connections", topics: ["Wiring Practice", "Sensor Connections", "Breadboard Basics", "Motor Control Setup"] },
        { level: 4, title: "Arduino Programming", topics: ["Arduino Introduction", "Installing Arduino IDE", "Basic Coding Logic", "Motor Programming"] },
        { level: 5, title: "Line Detection System", topics: ["IR Sensor Calibration", "Black & White Surface Detection", "Robot Navigation Logic", "Testing Sensor Accuracy"] },
        { level: 6, title: "Robot Assembly", topics: ["Chassis Assembly", "Wheel Alignment", "Wiring Management", "Power Optimization"] },
        { level: 7, title: "Smart Automation & Optimization", topics: ["Speed Control", "Turning Logic", "Smooth Line Tracking", "Performance Improvement"] },
        { level: 8, title: "Final Innovation Project", topics: ["Advanced Line Follower Build", "Robot Competition Challenge", "Problem Solving & Debugging", "Final Demonstration", "Certification Project"] }
      ]
    },
    {
      id: 6,
      title: "Robo Race Engineering",
      category: "Robotics",
      description: "Design and build high-speed racing robots and compete in track-based challenges.",
      price: "₹2026/mo",
      original_price: "₹3,999",
      rating: 4.9,
      students: 350,
      duration: "8 Levels",
      diff: "Advanced",
      image_url: "/assets/courses/robo_race.png",
      levels: [
        { level: 1, title: "Introduction to Robo Racing", topics: ["What is Robo Race?", "Types of Racing Robots", "Robot Safety Basics", "Understanding Robot Speed & Balance"] },
        { level: 2, title: "Electronics & Components", topics: ["Motors & Wheels", "Batteries & Power Supply", "Switches & Wiring", "Motor Driver Basics"] },
        { level: 3, title: "Robot Chassis Design", topics: ["Chassis Assembly", "Wheel Alignment", "Weight Distribution", "Stability & Speed Concepts"] },
        { level: 4, title: "Arduino & Motor Programming", topics: ["Arduino Introduction", "Motor Control Coding", "Speed Programming", "Direction Control"] },
        { level: 5, title: "Wireless Control Systems", topics: ["Bluetooth Module", "Remote-Controlled Robot", "Mobile App Control Basics", "Wireless Communication"] },
        { level: 6, title: "Speed Optimization", topics: ["Motor Tuning", "Friction Reduction", "Battery Efficiency", "Race Performance Testing"] },
        { level: 7, title: "Racing Strategies & Automation", topics: ["Obstacle Handling", "Fast Turning Techniques", "Race Track Testing", "Smart Navigation Concepts"] },
        { level: 8, title: "Robo Race Championship Project", topics: ["Build Advanced Racing Robot", "Team Racing Challenge", "Robot Performance Presentation", "Competition Simulation", "Certification Project"] }
      ]
    },
    {
      id: 7,
      title: "Robo Soccer Bot Engineering",
      category: "Robotics",
      description: "Create robots capable of playing soccer, complete with dribbling and kicking mechanisms.",
      price: "₹2026/mo",
      original_price: "₹4,500",
      rating: 4.9,
      students: 280,
      duration: "8 Levels",
      diff: "Advanced",
      image_url: "/assets/courses/robo_soccer.png",
      levels: [
        { level: 1, title: "Introduction to Robo Soccer", topics: ["What is Robo Soccer?", "Types of Soccer Robots", "Robot Safety Basics", "Understanding Robot Movements"] },
        { level: 2, title: "Electronics & Components", topics: ["Motors & Wheels", "Batteries & Power Systems", "Motor Driver Basics", "Wiring & Circuit Connections"] },
        { level: 3, title: "Robot Chassis Building", topics: ["Soccer Bot Design", "Chassis Assembly", "Wheel Alignment", "Balance & Stability"] },
        { level: 4, title: "Arduino Programming", topics: ["Arduino Introduction", "Motor Control Coding", "Direction & Speed Programming", "Basic Robot Logic"] },
        { level: 5, title: "Wireless Control System", topics: ["Bluetooth Module", "Mobile App Control", "Remote-Controlled Robot", "Wireless Communication Basics"] },
        { level: 6, title: "Ball Control & Movement", topics: ["Ball Pushing Mechanism", "Turning & Navigation", "Speed Optimization", "Match Movement Strategies"] },
        { level: 7, title: "Smart Soccer Automation", topics: ["Obstacle Avoidance", "Smart Navigation Concepts", "Team Coordination Basics", "Robot Performance Tuning"] },
        { level: 8, title: "Robo Soccer Championship Project", topics: ["Build Advanced Soccer Bot", "Team Competition Challenge", "Match Strategy Presentation", "Final Robo Soccer Match", "Certification Project"] }
      ]
    },
    {
      id: 8,
      title: "Future 3D Creators",
      category: "3D Design",
      description: "Learn digital modeling and 3D printing to bring your creative ideas into the physical world.",
      price: "₹2026/mo",
      original_price: "₹1,799",
      rating: 4.8,
      students: 500,
      duration: "8 Levels",
      diff: "Beginner",
      image_url: "/assets/courses/3d_design.png",
      levels: [
        { level: 1, title: "Introduction to 3D Modeling", topics: ["What is 3D Design?", "Understanding 3D Objects", "Introduction to Design Tools", "Creative Thinking Basics"] },
        { level: 2, title: "3D Design Foundations", topics: ["Shapes & Structures", "Object Scaling & Rotation", "Color & Material Basics", "Simple 3D Creations"] },
        { level: 3, title: "Digital Modeling Skills", topics: ["Advanced Shape Design", "Layering & Grouping", "Real-world Object Modeling", "Design Accuracy Basics"] },
        { level: 4, title: "Creative Product Design", topics: ["Toy & Character Modeling", "Robotics Part Design", "Mini Product Creation", "Innovation Sketching"] },
        { level: 5, title: "Mechanical & Robotics Modeling", topics: ["Gear & Wheel Design", "Chassis Modeling", "Robot Structure Design", "Engineering Concepts"] },
        { level: 6, title: "3D Printing & Prototyping", topics: ["Introduction to 3D Printing", "File Exporting", "Print Preparation", "Prototype Development"] },
        { level: 7, title: "Animation & Future Technologies", topics: ["3D Animation Basics", "AR/VR Introduction", "Game Asset Design", "Future Design Technologies"] },
        { level: 8, title: "Innovation & Final Project", topics: ["Advanced 3D Project", "Team Design Challenge", "Product Presentation", "Creative Portfolio Building", "Certification Project"] }
      ]
    },
    {
      id: 9,
      title: "Drone Engineering Lab",
      category: "Robotics",
      description: "Build, program, and fly your own drones while learning aerodynamics and flight control systems.",
      price: "₹2026/mo",
      original_price: "₹4,999",
      rating: 4.9,
      students: 150,
      duration: "8 Levels",
      diff: "Advanced",
      image_url: "/assets/courses/drone_eng.png",
      levels: [
        { level: 1, title: "Introduction to Drones", topics: ["What is a Drone?", "Types of Drones", "Drone Safety Basics", "Understanding Flight Principles"] },
        { level: 2, title: "Drone Components & Electronics", topics: ["Motors & Propellers", "ESC & Battery Systems", "Flight Controller Basics", "Drone Circuit Connections"] },
        { level: 3, title: "Drone Frame Building", topics: ["Frame Assembly", "Motor Mounting", "Wiring Management", "Weight & Balance Concepts"] },
        { level: 4, title: "Flight Controller Programming", topics: ["Introduction to Flight Controllers", "Calibration Process", "Basic Drone Configuration", "Flight Modes"] },
        { level: 5, title: "Remote Control & Navigation", topics: ["Transmitter & Receiver Setup", "Wireless Communication", "Drone Navigation Basics", "Stability Control"] },
        { level: 6, title: "Smart Drone Features", topics: ["Obstacle Detection", "Camera Integration", "GPS Basics", "Autonomous Flight Concepts"] },
        { level: 7, title: "Advanced Drone Engineering", topics: ["Drone Speed Optimization", "Aerodynamics Basics", "AI & Drone Technologies", "Future Drone Applications"] },
        { level: 8, title: "Final Drone Innovation Project", topics: ["Build Complete Drone System", "Team Flight Challenge", "Real-world Drone Demonstration", "Innovation Presentation", "Certification Project"] }
      ]
    },
    {
      id: 10,
      title: "Smart Sensors for Robotics",
      category: "Electronics",
      description: "Learn how robots perceive the world using various sensors and how to program sensor-driven behaviors.",
      price: "₹2026/mo",
      original_price: "₹2,299",
      rating: 4.7,
      students: 400,
      duration: "8 Levels",
      diff: "Intermediate",
      image_url: "/assets/courses/smart_sensors.png",
      levels: [
        { level: 1, title: "Introduction to Robotics Sensors", topics: ["What are Sensors?", "Importance of Sensors in Robots", "Types of Smart Sensors", "Sensor Safety Basics"] },
        { level: 2, title: "Basic Electronic Sensors", topics: ["Light Sensor", "Touch Sensor", "Sound Sensor", "Temperature Sensor Basics"] },
        { level: 3, title: "IR & Ultrasonic Sensors", topics: ["IR Sensor Working", "Ultrasonic Distance Measurement", "Obstacle Detection", "Sensor Connections"] },
        { level: 4, title: "Motion & Smart Detection", topics: ["PIR Motion Sensor", "Line Detection Sensors", "Robot Navigation Concepts", "Smart Automation Basics"] },
        { level: 5, title: "Sensor Programming with Arduino", topics: ["Arduino Sensor Coding", "Input & Output Logic", "Sensor Calibration", "Real-time Monitoring"] },
        { level: 6, title: "Robotics Automation Projects", topics: ["Obstacle Avoiding Robot", "Smart Alarm System", "Automatic Lighting Projects", "Sensor-based Robot Activities"] },
        { level: 7, title: "AI & Intelligent Sensor Systems", topics: ["AI in Smart Sensors", "IoT Sensor Networks", "Smart Devices", "Future Robotics Technologies"] },
        { level: 8, title: "Innovation & Final Project", topics: ["Build Sensor-Based Smart Robot", "Team Innovation Challenge", "Problem Solving Activities", "Final Project Presentation", "Certification Project"] }
      ]
    },
    {
      id: 11,
      title: "Degrees of Freedom in Robotics",
      category: "Robotics",
      description: "Master robot kinematics and multi-axis movement by building advanced robotic arms and humanoid joints.",
      price: "₹2026/mo",
      original_price: "₹3,500",
      rating: 4.8,
      students: 300,
      duration: "8 Levels",
      diff: "Intermediate",
      image_url: "/assets/courses/robot_motion.png",
      levels: [
        { level: 1, title: "Introduction to Robot Movements", topics: ["What is Robotics?", "Understanding Robot Motion", "Basics of Robot Directions", "Introduction to Degrees of Freedom (DOF)"] },
        { level: 2, title: "Types of Robot Movements", topics: ["Linear Motion", "Rotational Motion", "Axis & Joint Basics", "Robot Positioning Concepts"] },
        { level: 3, title: "Understanding DOF Systems", topics: ["1 DOF to 6 DOF Robots", "Robot Arm Movements", "Multi-axis Motion", "Real-world Robotics Examples"] },
        { level: 4, title: "Servo Motors & Control", topics: ["Introduction to Servo Motors", "Joint Movement Control", "Angle Programming", "Motion Accuracy Basics"] },
        { level: 5, title: "Robotic Arm Engineering", topics: ["Building Simple Robotic Arm", "Joint Coordination", "Pick & Place Concepts", "Motion Synchronization"] },
        { level: 6, title: "Programming Robot Movements", topics: ["Arduino Motion Programming", "Sensor Integration", "Smart Movement Control", "Automation Logic"] },
        { level: 7, title: "Advanced Robotics & AI Motion", topics: ["AI-based Robot Control", "Industrial Robot Movements", "Humanoid Robotics Concepts", "Future Robotics Technologies"] },
        { level: 8, title: "Innovation & Final Robotics Project", topics: ["Build Multi-DOF Robot", "Team Innovation Challenge", "Robot Motion Demonstration", "Final Presentation", "Certification Project"] }
      ]
    },
    {
      id: 12,
      title: "ROS Robotics Engineering",
      category: "Robotics",
      description: "Learn the industry-standard Robot Operating System (ROS) to build professional-grade autonomous robots.",
      price: "₹2026/mo",
      original_price: "₹5,999",
      rating: 4.9,
      students: 200,
      duration: "8 Levels",
      diff: "Advanced",
      image_url: "/assets/courses/ros_robotics.png",
      levels: [
        { level: 1, title: "Introduction to ROS", topics: ["What is ROS?", "Basics of Robot Operating System", "Understanding Robotics Software", "ROS Environment Setup"] },
        { level: 2, title: "Linux & ROS Foundations", topics: ["Introduction to Linux", "ROS File Structure", "Terminal Commands", "Creating First ROS Workspace"] },
        { level: 3, title: "ROS Communication System", topics: ["ROS Nodes", "Topics & Messages", "Publishers & Subscribers", "Real-time Robot Communication"] },
        { level: 4, title: "Robot Sensors & Control", topics: ["Sensor Integration", "Motor Control", "ROS Sensor Data", "Robot Movement Basics"] },
        { level: 5, title: "Simulation & Visualization", topics: ["Introduction to Gazebo", "RViz Visualization", "Robot Simulation Basics", "Testing Virtual Robots"] },
        { level: 6, title: "Autonomous Robotics", topics: ["Navigation Concepts", "Obstacle Avoidance", "Mapping & Localization", "Smart Robot Behaviors"] },
        { level: 7, title: "AI & Advanced ROS Systems", topics: ["AI Integration with ROS", "Machine Learning Concepts", "Industrial Robotics", "Future Autonomous Systems"] },
        { level: 8, title: "Innovation & Final ROS Project", topics: ["Build Autonomous Robot Project", "Team Innovation Challenge", "Robot Demonstration", "Technical Presentation", "Certification Project"] }
      ]
    }
  ]
};



const getStorageData = (key: string) => {
  const data = localStorage.getItem(`doorstep_${key}`);
  if (!data && INITIAL_DATA[key]) {
    setStorageData(key, INITIAL_DATA[key]);
    return INITIAL_DATA[key];
  }
  return data ? JSON.parse(data) : (INITIAL_DATA[key] || []);
};

const setStorageData = (key: string, data: any) => {
  localStorage.setItem(`doorstep_${key}`, JSON.stringify(data));
};

const authListeners: any[] = [];

const notifyAuthListeners = (event: string, session: any) => {
  authListeners.forEach(listener => listener(event, session));
};

const mockSupabase: any = {
  auth: {
    getSession: async () => {
      const user = JSON.parse(localStorage.getItem('doorstep_auth_user') || 'null');
      return { data: { session: user ? { user } : null }, error: null };
    },
    onAuthStateChange: (callback: any) => {
      authListeners.push(callback);
      return { data: { subscription: { unsubscribe: () => {
        const index = authListeners.indexOf(callback);
        if (index !== -1) authListeners.splice(index, 1);
      } } } };
    },
    signInWithPassword: async ({ email }: { email: string }) => {
      const users = getStorageData('users');
      let user = users.find((u: any) => u.email === email);
      
      if (!user) {
        user = { 
          id: Math.random().toString(36).substring(7), 
          email, 
          role: email.includes('trainer') ? 'trainer' : 'student',
          name: email.split('@')[0],
          phone_verified: true,
          onboarding_complete: true
        };
        users.push(user);
        setStorageData('users', users);
      }
      
      localStorage.setItem('doorstep_auth_user', JSON.stringify(user));
      notifyAuthListeners('SIGNED_IN', { user });
      return { data: { user, session: { user } }, error: null };
    },
    signUp: async ({ email, password, options }: any) => {
      const user = { 
        id: Math.random().toString(36).substring(7), 
        email, 
        role: options?.data?.role || 'student',
        name: options?.data?.name || email.split('@')[0],
        phone_verified: false,
        onboarding_complete: false,
        ...options?.data
      };
      const users = getStorageData('users');
      users.push(user);
      setStorageData('users', users);
      localStorage.setItem('doorstep_auth_user', JSON.stringify(user));
      notifyAuthListeners('SIGNED_IN', { user });
      return { data: { user, session: { user } }, error: null };
    },
    signInWithOtp: async ({ phone }: { phone: string }) => {
      console.log(`Mock OTP sent to ${phone}: 123456`);
      return { data: {}, error: null };
    },
    verifyOtp: async ({ token }: { token: string }) => {
      if (token === '123456') {
        const user = JSON.parse(localStorage.getItem('doorstep_auth_user') || '{}');
        user.phone_verified = true;
        localStorage.setItem('doorstep_auth_user', JSON.stringify(user));
        return { data: { user }, error: null };
      }
      return { data: { user: null }, error: { message: 'Invalid OTP' } };
    },
    signOut: async () => {
      localStorage.removeItem('doorstep_auth_user');
      notifyAuthListeners('SIGNED_OUT', null);
      return { error: null };
    },
    getUser: async () => {
      const user = JSON.parse(localStorage.getItem('doorstep_auth_user') || 'null');
      return { data: { user }, error: null };
    },
  },
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      eq: (column: string, value: any) => ({
        single: async () => {
          const data = getStorageData(table);
          const item = data.find((i: any) => i[column] === value);
          return { data: item || null, error: item ? null : { code: 'PGRST116', message: 'Not found' } };
        },
        maybeSingle: async () => {
          const data = getStorageData(table);
          const item = data.find((i: any) => i[column] === value);
          return { data: item || null, error: null };
        },
        order: (col: string, { ascending }: any = {}) => {
          const data = getStorageData(table).filter((i: any) => i[column] === value);
          return { data, error: null };
        },
      }),
      order: (col: string, { ascending }: any = {}) => ({
        data: getStorageData(table).sort((a: any, b: any) => {
          if (ascending) return a[col] > b[col] ? 1 : -1;
          return a[col] < b[col] ? 1 : -1;
        }),
        error: null,
        then: (resolve: any) => resolve({ data: getStorageData(table), error: null }),
      }),
      limit: (n: number) => ({
        data: getStorageData(table).slice(0, n),
        error: null
      }),
      then: (resolve: any) => resolve({ data: getStorageData(table), error: null }),
    }),
    insert: (items: any[]) => ({
      select: () => ({
        single: async () => {
          const data = getStorageData(table);
          const newItems = Array.isArray(items) ? items : [items];
          const enrichedItems = newItems.map(item => ({ 
            id: Math.random().toString(36).substring(7), 
            created_at: new Date().toISOString(),
            ...item 
          }));
          data.push(...enrichedItems);
          setStorageData(table, data);
          return { data: enrichedItems[0], error: null };
        }
      }),
      then: (resolve: any) => {
        const data = getStorageData(table);
        const newItems = Array.isArray(items) ? items : [items];
        data.push(...newItems);
        setStorageData(table, data);
        resolve({ data: newItems, error: null });
      }
    }),
    update: (updates: any) => ({
      eq: (column: string, value: any) => {
        const data = getStorageData(table);
        const index = data.findIndex((i: any) => i[column] === value);
        if (index !== -1) {
          data[index] = { ...data[index], ...updates, updated_at: new Date().toISOString() };
          setStorageData(table, data);
        }
        return Promise.resolve({ data: data[index], error: null });
      },
    }),
    upsert: (items: any) => {
      const data = getStorageData(table);
      const newItems = Array.isArray(items) ? items : [items];
      newItems.forEach(item => {
        const index = data.findIndex((i: any) => i.id === item.id || (item.user_id && i.user_id === item.user_id));
        if (index !== -1) {
          data[index] = { ...data[index], ...item };
        } else {
          data.push({ id: Math.random().toString(36).substring(7), ...item });
        }
      });
      setStorageData(table, data);
      return Promise.resolve({ data: newItems, error: null });
    },
    delete: () => ({
      eq: (column: string, value: any) => {
        const data = getStorageData(table).filter((i: any) => i[column] !== value);
        setStorageData(table, data);
        return Promise.resolve({ error: null });
      },
    }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => ({ data: { path }, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: URL.createObjectURL(file) } }),
    }),
  },
  channel: () => ({
    on: () => ({
      subscribe: () => ({ unsubscribe: () => {} }),
    }),
  }),
  removeChannel: (channel: any) => {},
};

export const supabase = mockSupabase;

export const uploadFile = async (bucket: string, path: string, file: File) => {
  return URL.createObjectURL(file);
};




