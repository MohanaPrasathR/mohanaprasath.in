// Portfolio content — single source of truth

export const personal = {
  nameFirst: 'MOHANA',
  nameLast: 'PRASATH',
  title: 'CS Undergrad · AI & Full Stack Developer',
  tagline: 'Building intelligent software that solves real problems.',
  bio: "Computer Science undergraduate at SRM IST specialising in Software Engineering, Data Analytics, Artificial Intelligence, and Machine Learning. Passionate about solving business problems through analytical thinking, predictive modelling, and scalable software solutions.",
  bioLine2:
    'Engineering is my medium. Intelligence is my standard.',
  location: 'Guduvanchery, Chennai, India',
  availability: 'Open to opportunities',
  email: 'mr0928@srmist.edu.in',
  phone: '+91 78453 79301',
  resumeUrl: '/resume/Mohana_Prasath_Resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/MohanaPrasathR' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohana-prasath-r-6268b132a/' },
  ],
};

export const projects = [
  {
    id: '01',
    title: 'TechMobile — E-Commerce Store',
    category: 'Full Stack · AI',
    year: '2025',
    demoUrl: 'https://mobilesale-ten.vercel.app',
    githubUrl: 'https://github.com/MohanaPrasathR/ec-mobile',
    description:
      'A responsive e-commerce web app for flagship smartphone sales with real-time product search, brand filtering, shopping cart management, and a modern dark-themed UI.',
    longDescription:
      'Built with Next.js, React, TypeScript, and CSS Modules. Implemented reusable components optimised for mobile, tablet, and desktop. Smooth animations enhance usability and visual appeal.',
    tech: ['Next.js', 'React', 'TypeScript', 'CSS Modules'],
    accentColor: '#DC2626',
    bgTone: '#080808',
  },
  {
    id: '02',
    title: 'E-Hospital AI Framework',
    category: 'Full Stack · AI & ML · DBMS',
    year: '2025',
    demoUrl: '/demos/ehospital',
    githubUrl: 'https://github.com/MohanaPrasathR/E-HOSPITAL',
    description:
      'A full-stack healthcare app where users input symptoms and receive AI-assisted disease predictions using Random Forest and NLP models.',
    longDescription:
      'Designed patient registration, symptom management, and prediction workflows. Managed patient records and prediction results through efficient database operations with Python and SQL.',
    tech: ['Python', 'SQL', 'NLP', 'Random Forest', 'Flask'],
    accentColor: '#DC2626',
    bgTone: '#060606',
  },
  {
    id: '03',
    title: 'Stadium Management System',
    category: 'Database Management Systems',
    year: '2024',
    demoUrl: 'https://stadium-management-omega.vercel.app',
    githubUrl: 'https://github.com/MohanaPrasathR/Stadium-Management-System',
    description:
      'A stadium management system for ticket booking and event scheduling, with optimised relational schemas and a Python-based GUI.',
    longDescription:
      'Designed relational database schemas and optimised SQL queries for data retrieval efficiency. Built a Python GUI to streamline stadium operations end-to-end.',
    tech: ['Python', 'SQL', 'DBMS'],
    accentColor: '#DC2626',
    bgTone: '#070707',
  },
  {
    id: '04',
    title: 'Cache Memory Simulator',
    category: 'Computer Architecture',
    year: '2024',
    demoUrl: '/demos/cache-simulator',
    githubUrl: 'https://github.com/MohanaPrasathR/algorithm-visualizer',
    description:
      'An interactive simulator to visualise cache operations — hits, misses, and replacement policies — in real time with RESTful APIs.',
    longDescription:
      'Built with React.js, Node.js, and Express.js. Designed an intuitive UI for analysing cache performance and memory access patterns through simulated memory operations.',
    tech: ['React', 'Node.js', 'Express.js'],
    accentColor: '#DC2626',
    bgTone: '#050505',
  },
  {
    id: '05',
    title: 'Electricity Usage Predictor',
    category: 'Machine Learning',
    year: '2024',
    demoUrl: '/demos/electricity-predictor',
    githubUrl: 'https://github.com/MohanaPrasathR/machine-learning-basics',
    description:
      'A machine learning model to forecast household electricity consumption using Random Forest Regression with time-based feature engineering.',
    longDescription:
      'Applied data preprocessing, feature extraction, and model evaluation to generate data-driven insights from electricity usage patterns.',
    tech: ['Python', 'Scikit-Learn', 'Random Forest', 'Pandas'],
    accentColor: '#DC2626',
    bgTone: '#060606',
  },
];

export const skills = [
  {
    category: 'AI & ML',
    items: ['Machine Learning', 'NLP', 'LLMs', 'Random Forest', 'PyTorch', 'Scikit-Learn', 'OpenAI', 'OLLAMA'],
  },
  {
    category: 'Languages',
    items: ['Python', 'C++', 'C', 'MySQL', 'TypeScript', 'JavaScript'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'CSS Modules'],
  },
  {
    category: 'Backend & APIs',
    items: ['FastAPI', 'Flask', 'REST APIs', 'Node.js', 'Express.js'],
  },
  {
    category: 'Data & DB',
    items: ['SQL', 'MySQL', 'Data Science', 'Feature Engineering', 'Pandas'],
  },
  {
    category: 'Tools',
    items: ['GitHub', 'VS Code', 'PyTorch', 'Scikit-Learn', 'OLLAMA', 'DSA', 'OOP'],
  },
];

export const experience = [
  {
    role: 'B.Tech Student — CSE',
    company: 'SRM Institute of Science and Technology',
    period: '2023 — 2027',
    description:
      'Pursuing B.Tech in Computer Science & Engineering. Specialising in Software Engineering, Data Analytics, AI, Machine Learning, and Database Systems.',
    tags: ['AI', 'ML', 'DBMS', 'Full Stack', 'Python'],
  },
  {
    role: 'MongoDB Certified Developer',
    company: 'MongoDB University',
    period: 'Apr 2026',
    description:
      'Earned the MongoDB Associate Developer certification (MDB7w5qibjbij) — demonstrating proficiency in NoSQL database design, querying, and application integration.',
    tags: ['MongoDB', 'NoSQL', 'Database'],
  },
  {
    role: 'Machine Learning — NPTEL',
    company: 'NPTEL / IIT',
    period: 'Oct 2025',
    description:
      'Completed NPTEL\'s Introduction to Machine Learning course, covering supervised learning, model evaluation, and real-world ML applications.',
    tags: ['Python', 'ML', 'Scikit-Learn'],
  },
];

export const education = [
  {
    degree: 'B.Tech · Computer Science & Engineering',
    institution: 'SRM Institute of Science and Technology, Kattankulathur',
    period: '2023 — 2027',
  },
  {
    degree: 'Class XII · CBSE · Bio-Maths',
    institution: 'SRM Public School, Thuraiyur',
    period: '2023',
  },
  {
    degree: 'Class X · CBSE',
    institution: 'SRM Public School, Thuraiyur',
    period: '2021',
  },
];

export const certifications = [
  {
    id: '01',
    title: 'Associate Developer Python',
    issuer: 'MongoDB',
    date: 'Apr 2026',
    credentialId: 'MDB7w5qibjbij',
    credentialUrl: 'https://university.mongodb.com/certification/verify',
    skills: ['MongoDB', 'Python', 'NoSQL', 'Aggregation Framework', 'Database Architecture'],
  },
  {
    id: '02',
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL / IIT Kharagpur',
    date: 'Oct 2025',
    credentialId: 'NPTEL25CS88',
    credentialUrl: 'https://nptel.ac.in/noc',
    skills: ['Machine Learning', 'Python', 'Supervised Learning', 'Model Evaluation'],
  },
  {
    id: '03',
    title: 'Real-Time Operating Systems: Design & Implementation',
    issuer: 'Udemy',
    date: 'Jan 2025',
    credentialId: 'UC-a99e4a78-4ceb-494f-9d95-48de222f6d8d',
    credentialUrl: 'https://www.udemy.com/certificate/UC-a99e4a78-4ceb-494f-9d95-48de222f6d8d/',
    skills: ['RTOS', 'Embedded Systems', 'Concurrency', 'Task Scheduling'],
  },
  {
    id: '04',
    title: 'Programming in Java',
    issuer: 'NPTEL',
    date: 'Dec 2024',
    credentialId: 'NPTEL24CSJAVA',
    credentialUrl: 'https://nptel.ac.in/noc',
    skills: ['Java', 'OOP', 'Exception Handling', 'Multithreading', 'Collections Framework'],
  },
  {
    id: '05',
    title: 'Data Structures',
    issuer: 'Udemy',
    date: 'Nov 2024',
    credentialId: 'UC-662aed96-7e27-49d3-b9c9-1bab8fOf61ff',
    credentialUrl: 'https://www.udemy.com/certificate/UC-662aed96-7e27-49d3-b9c9-1bab8fOf61ff/',
    skills: ['Data Structures', 'Trees', 'Graphs', 'Algorithm Optimization', 'Memory Management'],
  },
  {
    id: '06',
    title: 'Programming in C++',
    issuer: 'Udemy',
    date: 'Apr 2024',
    credentialId: 'UC-e57de6d6-7ab0-4f55-83ab-e7021ad1e97b',
    credentialUrl: 'https://www.udemy.com/certificate/UC-e57de6d6-7ab0-4f55-83ab-e7021ad1e97b/',
    skills: ['C++', 'Object-Oriented Programming', 'Pointers', 'STL'],
  },
];

