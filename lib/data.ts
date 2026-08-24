// Portfolio content — single source of truth

export const personal = {
  nameFirst: 'MOHANA',
  nameLast: 'PRASATH',
  title: 'Computer Science Undergrad · Software Engineer & Full Stack Developer',
  tagline: 'Building analytics-driven software products, robust REST APIs, and scalable full-stack applications.',
  bio: "Computer Science undergraduate at SRM IST with experience building Java, Python, SQL, and REST-based applications. Strong foundation in object-oriented programming, database fundamentals, API development, and software testing. Passionate about analytics-driven software products, database architecture, and quality engineering.",
  bioLine2:
    'Engineering with precision. Scalability and quality by design.',
  location: 'Chennai, India',
  availability: 'Open to software engineering opportunities & internships',
  email: 'mr0928@srmist.edu.in',
  phone: '+91 78453 79301',
  resumeUrl: '/Mohana_Prasath_Resume.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/MohanaPrasathR' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohana-prasath-r-6268b132a/' },
    { label: 'Instagram', href: 'https://www.instagram.com/mohanaprasathr/' },
  ],
  languages: ['English', 'Tamil', 'Hindi', 'Japanese (Elementary)'],
};

export const projects = [
  {
    id: '01',
    title: 'Hotel Revenue Analytics API & Dashboard',
    category: 'Backend & Microservices · Data Analytics',
    year: '2026',
    demoUrl: '/demos/hotel-revenue',
    githubUrl: 'https://github.com/MohanaPrasathR/hotel-revenue-analytics-api',
    description:
      'A high-performance REST API for managing hotel bookings and analyzing revenue by hotel, month, and booking status with real-time JPQL aggregations.',
    longDescription:
      'Built with Java, Spring Boot 3, and MySQL/H2. Used JPA/Hibernate for database persistence, implemented strict validation, RFC-7807 exception handling, and OpenAPI/Swagger documentation. Added comprehensive JUnit and MockMvc automated test suites.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'JPA/Hibernate', 'JUnit', 'Swagger', 'Angular'],
    accentColor: '#10B981',
    bgTone: '#070A10',
  },
  {
    id: '02',
    title: 'E-Hospital: AI-Assisted Diagnosis Platform',
    category: 'Full Stack · AI & ML · DBMS',
    year: '2025',
    demoUrl: 'https://minor-project-3rd-year-master.vercel.app/',
    githubUrl: 'https://github.com/MohanaPrasathR/E-HOSPITAL',
    description:
      'An intelligent healthcare application that processes patient symptoms and provides AI-assisted disease predictions.',
    longDescription:
      'Implemented Random Forest and NLP workflows with database-backed patient and prediction records. Designed robust symptom intake, classification pipelines, and database operations using Python and SQL.',
    tech: ['Python', 'SQL', 'Machine Learning', 'NLP', 'Random Forest', 'Flask'],
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
      'A GUI application for ticket booking, event scheduling, and seat allocation using a normalized relational database.',
    longDescription:
      'Engineered normalized relational database schemas and optimized SQL queries for managing customer, booking, and event data with low-latency retrieval.',
    tech: ['Python', 'SQL', 'DBMS', 'MySQL', 'Relational Normalization'],
    accentColor: '#DC2626',
    bgTone: '#070707',
  },
  {
    id: '04',
    title: 'TechMobile — Flagship E-Commerce Store',
    category: 'Full Stack · Web Applications',
    year: '2025',
    demoUrl: 'https://mobilesale.vercel.app',
    githubUrl: 'https://github.com/MohanaPrasathR/ec-mobile',
    description:
      'A responsive e-commerce web app for smartphone sales with real-time product search, brand filtering, and cart state management.',
    longDescription:
      'Built with Next.js, React.js, TypeScript, and CSS Modules. Implemented reusable modular components optimized for mobile, tablet, and desktop with smooth interactive animations.',
    tech: ['Next.js', 'React.js', 'TypeScript', 'Node.js', 'CSS Modules'],
    accentColor: '#DC2626',
    bgTone: '#080808',
  },
  {
    id: '05',
    title: 'Cache Memory Simulator & Visualizer',
    category: 'Computer Architecture · Systems',
    year: '2024',
    demoUrl: '/demos/cache-simulator',
    githubUrl: 'https://github.com/MohanaPrasathR/algorithm-visualizer',
    description:
      'An interactive simulator to visualize cache operations — hits, misses, and replacement policies (LRU/FIFO) in real-time with REST APIs.',
    longDescription:
      'Built with React.js, Node.js, and Express.js. Designed an intuitive interface for analyzing cache performance and memory access patterns through simulated memory hierarchy operations.',
    tech: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'JavaScript'],
    accentColor: '#DC2626',
    bgTone: '#050505',
  },
  {
    id: '06',
    title: 'Electricity Usage Predictor',
    category: 'Machine Learning · Predictive Analytics',
    year: '2024',
    demoUrl: '/demos/electricity-predictor',
    githubUrl: 'https://github.com/MohanaPrasathR/machine-learning-basics',
    description:
      'A machine learning regression model to forecast household electricity consumption with time-based feature engineering.',
    longDescription:
      'Applied data preprocessing, feature extraction, and model evaluation with Scikit-Learn and Pandas to generate data-driven insights from electricity consumption patterns.',
    tech: ['Python', 'Scikit-Learn', 'Random Forest', 'Pandas', 'Data Science'],
    accentColor: '#DC2626',
    bgTone: '#060606',
  },
];

export const skills = [
  {
    category: 'Languages',
    items: ['Java', 'Python', 'SQL', 'JavaScript', 'C++', 'HTML5'],
  },
  {
    category: 'Core & Concepts',
    items: ['OOP', 'DBMS', 'Data Structures', 'REST APIs', 'Software Testing', 'Debugging'],
  },
  {
    category: 'Databases',
    items: ['MySQL', 'MongoDB', 'Database Design', 'Joins', 'Aggregation', 'H2 Database'],
  },
  {
    category: 'Technologies',
    items: ['Spring Boot', 'JPA', 'Hibernate', 'React.js', 'Node.js', 'Next.js', 'Express.js'],
  },
  {
    category: 'Tools & QA',
    items: ['Git', 'GitHub', 'Maven', 'JUnit', 'Selenium WebDriver', 'Postman', 'Swagger', 'MockMvc'],
  },
  {
    category: 'Spoken Languages',
    items: ['English', 'Tamil', 'Hindi', 'Japanese (Elementary)'],
  },
];

export const experience = [
  {
    role: 'B.Tech in Computer Science & Engineering',
    company: 'SRM Institute of Science & Technology, Kattankulathur',
    period: '2023 — 2027',
    description:
      'Pursuing B.Tech in CSE with hands-on experience building Java, Python, SQL, and REST-based applications. Solid grounding in OOP, DBMS, API development, and software testing.',
    tags: ['Java', 'Spring Boot', 'Python', 'SQL', 'DBMS', 'Software Testing'],
  },
  {
    role: 'Certified Automation & QA Engineer',
    company: 'Test Automation University / HackerRank',
    period: 'Aug 2026',
    description:
      'Certified in Selenium WebDriver with Java and Advanced SQL — demonstrating competence in UI test automation, test architecture, and high-performance database querying.',
    tags: ['Selenium', 'Java', 'SQL Advanced', 'Testing'],
  },
  {
    role: 'Certified Associate Developer',
    company: 'MongoDB University',
    period: 'Apr 2026',
    description:
      'Earned MongoDB Associate Developer certification — validated knowledge in document database modeling, indexing strategies, and aggregation pipelines.',
    tags: ['MongoDB', 'NoSQL', 'Database Design'],
  },
];

export const education = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'SRM Institute of Science & Technology, Kattankulathur',
    period: '2023 — 2027',
  },
  {
    degree: 'Class XII – CBSE · Bio-Maths (80.4%)',
    institution: 'SRM Public School, Thuraiyur',
    period: '2023',
  },
  {
    degree: 'Class X – CBSE (87.2%)',
    institution: 'SRM Public School, Thuraiyur',
    period: '2021',
  },
];

export const certifications = [
  {
    id: '01',
    title: 'Selenium WebDriver with Java',
    issuer: 'Test Automation University',
    date: 'Aug 2026',
    credentialId: 'f5d7edca',
    credentialUrl: 'https://testautomationu.applitools.com/certificates/f5d7edca',
    skills: ['Selenium WebDriver', 'Java', 'UI Test Automation', 'Test Architecture', 'Quality Engineering'],
  },
  {
    id: '02',
    title: 'Programming in Java',
    issuer: 'NPTEL / IIT',
    date: 'Dec 2024',
    credentialId: 'NPTEL24CSJAVA',
    credentialUrl: 'https://nptel.ac.in/noc',
    skills: ['Java', 'OOP', 'Multithreading', 'Collections Framework', 'Exception Handling'],
  },
  {
    id: '03',
    title: 'HackerRank SQL (Advanced)',
    issuer: 'HackerRank',
    date: 'Aug 2026',
    credentialId: '782585506b39',
    credentialUrl: 'https://www.hackerrank.com/certificates/782585506b39',
    skills: ['Advanced SQL', 'Query Optimization', 'Complex Joins', 'Aggregations', 'Database Design'],
  },
  {
    id: '04',
    title: 'MongoDB Associate Developer',
    issuer: 'MongoDB',
    date: 'Apr 2026',
    credentialId: 'MDB7w5qibjbij',
    credentialUrl: 'https://university.mongodb.com/certification/verify',
    skills: ['MongoDB', 'NoSQL', 'Aggregation Pipelines', 'Document Modeling', 'Database Architecture'],
  },
  {
    id: '05',
    title: 'Programming in C++',
    issuer: 'Udemy',
    date: 'Apr 2024',
    credentialId: 'UC-e57de6d6-7ab0-4f55-83ab-e7021ad1e97b',
    credentialUrl: 'https://www.udemy.com/certificate/UC-e57de6d6-7ab0-4f55-83ab-e7021ad1e97b/',
    skills: ['C++', 'OOP', 'STL', 'Pointers', 'Memory Management'],
  },
  {
    id: '06',
    title: 'Introduction to Machine Learning',
    issuer: 'NPTEL / IIT Kharagpur',
    date: 'Oct 2025',
    credentialId: 'NPTEL25CS88',
    credentialUrl: 'https://nptel.ac.in/noc',
    skills: ['Machine Learning', 'Python', 'Supervised Learning', 'Model Evaluation', 'Feature Engineering'],
  },
  {
    id: '07',
    title: 'Data Structures',
    issuer: 'Udemy',
    date: 'Nov 2024',
    credentialId: 'UC-662aed96-7e27-49d3-b9c9-1bab8fOf61ff',
    credentialUrl: 'https://www.udemy.com/certificate/UC-662aed96-7e27-49d3-b9c9-1bab8fOf61ff/',
    skills: ['Data Structures', 'Algorithms', 'Trees & Graphs', 'Time Complexity', 'Optimization'],
  },
  {
    id: '08',
    title: 'Real-Time Operating Systems: Design & Implementation',
    issuer: 'Udemy',
    date: 'Jan 2025',
    credentialId: 'UC-a99e4a78-4ceb-494f-9d95-48de222f6d8d',
    credentialUrl: 'https://www.udemy.com/certificate/UC-a99e4a78-4ceb-494f-9d95-48de222f6d8d/',
    skills: ['RTOS', 'Embedded Systems', 'Concurrency', 'Task Scheduling', 'Synchronization'],
  },
];
