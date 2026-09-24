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
    title: 'StayPulse: Hotel Revenue Intelligence',
    category: 'Full Stack · Machine Learning · Data Analytics',
    year: '2026',
    demoUrl: '/demos/hotel-revenue',
    githubUrl: 'https://github.com/MohanaPrasathR/hotel-revenue-analytics',
    description:
      'Spring Boot + Angular revenue analytics with a Python ML service for 30-day forecasting, anomaly detection, cancellation risk and rate recommendations.',
    longDescription:
      'Spring Boot 3 REST API with JPA/Hibernate on MySQL, RFC 7807 errors, Swagger docs and 29 JUnit/MockMvc tests. A FastAPI service blends Holt-Winters with a booking-pickup model (2.6% MAPE in a 28-day backtest vs 13.5% for the naive baseline), flags unusual bookings with Isolation Forest and control rules, and scores cancellation risk with a Random Forest.',
    tech: ['Java', 'Spring Boot', 'MySQL', 'Angular', 'Python', 'scikit-learn', 'FastAPI', 'JUnit'],
    accentColor: '#10B981',
    bgTone: '#070A10',
  },
  {
    id: '02',
    title: 'MediTriage: AI Symptom Triage & Live Clinic Queue',
    category: 'Full Stack · AI & ML · Security',
    year: '2026',
    demoUrl: '/demos/ehospital',
    githubUrl: 'https://github.com/MohanaPrasathR/meditriage',
    description:
      'Flask app with passwordless email OTP login, an NLP + Random Forest symptom checker, appointment booking and a real-time queue over Server-Sent Events.',
    longDescription:
      'Rebuild of my E-Hospital minor project. OTP codes are HMAC-hashed with expiry, attempt limits and rate limiting; CSRF protection and role-based access throughout. Free-text symptoms are parsed with negation handling and typo correction; the classifier reaches 99% top-3 accuracy on held-out synthetic cases. 33 pytest tests.',
    tech: ['Python', 'Flask', 'SQLAlchemy', 'scikit-learn', 'NLP', 'SSE', 'pytest'],
    accentColor: '#DC2626',
    bgTone: '#060606',
  },
  {
    id: '03',
    title: 'ArenaPass: Stadium Tickets & Tours',
    category: 'Full Stack · Web Security · DBMS',
    year: '2026',
    demoUrl: 'https://stadium-management-omega.vercel.app',
    githubUrl: 'https://github.com/MohanaPrasathR/Stadium-Management-System',
    description:
      'Next.js ticketing app with bcrypt passwords, signed session cookies, server-side role checks and transactional seat-capacity control.',
    longDescription:
      'MySQL schema with foreign keys and constraints; bookings lock the event row in a transaction so the last tickets can’t be sold twice. Per-slot capacity for stadium tours, fan and admin dashboards with live revenue figures, and Vitest tests for session forgery, validation and capacity.',
    tech: ['Next.js', 'TypeScript', 'MySQL', 'bcrypt', 'Tailwind CSS', 'Vitest'],
    accentColor: '#DC2626',
    bgTone: '#070707',
  },
  {
    id: '04',
    title: 'PhoneVault: Smartphone Store',
    category: 'Full Stack · Web Applications',
    year: '2025',
    demoUrl: 'https://mobilesale.vercel.app',
    githubUrl: 'https://github.com/MohanaPrasathR/ec-mobile',
    description:
      'Next.js + MongoDB storefront with search, brand filters, cart and server-side checkout that reserves stock atomically.',
    longDescription:
      'Orders are priced on the server from the catalogue, and stock is reserved with conditional atomic updates so two shoppers can’t buy the last unit. Store management needs an admin key; search input is regex-escaped and product updates are field-whitelisted.',
    tech: ['Next.js', 'React', 'TypeScript', 'MongoDB', 'Mongoose', 'Vitest'],
    accentColor: '#DC2626',
    bgTone: '#080808',
  },
  {
    id: '05',
    title: 'Cache Memory Simulator & Visualizer',
    category: 'Computer Architecture · Systems',
    year: '2024',
    demoUrl: '/demos/cache-simulator',
    githubUrl: 'https://github.com/MohanaPrasathR/mohanaprasath.in/blob/main/app/demos/cache-simulator/page.tsx',
    description:
      'Interactive simulator that visualises cache hits, misses and LRU/FIFO replacement for a stream of memory addresses.',
    longDescription:
      'Runs entirely in the browser with React and TypeScript: enter addresses, pick a replacement policy and watch the cache lines, hit rate and evictions update step by step.',
    tech: ['React', 'TypeScript', 'Computer Architecture'],
    accentColor: '#DC2626',
    bgTone: '#050505',
  },
  {
    id: '06',
    title: 'VoltCast: Household Energy Forecasting',
    category: 'Machine Learning · Time Series',
    year: '2026',
    demoUrl: '/demos/electricity-predictor',
    githubUrl: 'https://github.com/MohanaPrasathR/voltcast',
    description:
      'Hour-by-hour electricity forecasting with leak-free lag features and a chronological comparison of Ridge, Random Forest and Gradient Boosting.',
    longDescription:
      'Loads and cleans the UCI household power dataset (2M minute-level rows) into hourly kWh, engineers calendar, lag and rolling features, and picks the best model on a validation split. On held-out data it cuts error by about 27% versus a same-hour-last-week baseline. CLI, FastAPI endpoint and pytest suite.',
    tech: ['Python', 'Pandas', 'scikit-learn', 'Time Series', 'FastAPI'],
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
