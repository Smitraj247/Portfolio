export const portfolioData = {
  profile: {
    name: 'Smitraj Makvana',
    monogram: 'SM',
    title: 'Full-Stack Developer',
    status: 'Open to Full-Time Roles',
    headlineLead: 'Building Scalable',
    headlineAccent: 'Full-Stack Web',
    headlineTail: 'Applications',
    summary:
      'I build end-to-end web apps with React, Next.js, and Node.js, from REST APIs and authentication to admin dashboards and responsive interfaces.',
    email: 'smitrajsinhmakvana@gmail.com',
    phone: '+91 9327178482',
    location: 'India • Open to Remote',
    github: 'https://github.com/Smitraj24',
    linkedin: 'https://linkedin.com/in/smitrajmakvana',
    typingTitles: [
      'React · Next.js · Node.js',
      'REST APIs & Authentication',
      'Dashboards & Admin Panels',
    ],
    metrics: [
      { value: '3', label: 'Featured Projects', color: 'text-brand-400' },
      { value: '2', label: 'Shipped Product Apps', color: 'text-accent-emerald' },
      { value: 'REST APIs', label: 'Built & Integrated', color: 'text-accent-violet' },
      { value: 'RBAC', label: 'Admin & User Modules', color: 'text-accent-cyan' },
    ],
    coreStack: ['React.js', 'Next.js', 'Node.js', 'Nest.js', 'MongoDB', 'PostgreSQL'],
  },
  about: {
    heading: 'About',
    body: 'I work independently, pick up new tools quickly, and debug across the full stack to ship reliable features. At Krishang Technolab I have built REST APIs, authentication flows, super admin panels, dashboards, and user-management modules with role-based access.',
    education: [
      {
        title: 'B.Tech in Computer Engineering',
        place: 'Ganpat University',
        period: '2022 — 2026',
      },
      {
        title: 'XII, GSHSEB — 79%',
        place: 'Sankalp School of Science',
        period: '2021 — 2022',
      },
      {
        title: 'X, GSHSEB — 78%',
        place: 'Vivekanand Vidyalaya',
        period: '2020 — 2021',
      },
    ],
    certifications: [
      'Java — Infosys Springboard',
      'Python — Cisco (2025)',
      'Web Development — IBM SkillsBuild (2025)',
      'IBM SkillsBuild Project-Based Learning Program, 2025',
    ],
  },
  skills: [
    {
      name: 'JavaScript',
      category: 'frontend',
      level: 'Advanced',
      icon: 'code-2',
      color: 'text-sky-400',
      desc: 'ESNext, DOM, async flows, frontend logic',
    },
    {
      name: 'React.js / Next.js',
      category: 'frontend',
      level: 'Advanced',
      icon: 'atom',
      color: 'text-cyan-400',
      desc: 'Components, routing, responsive UI, dashboards',
    },
    {
      name: 'HTML / CSS',
      category: 'frontend',
      level: 'Advanced',
      icon: 'palette',
      color: 'text-teal-400',
      desc: 'Responsive layouts, accessible interfaces',
    },
    {
      name: 'Node.js / Express.js',
      category: 'backend',
      level: 'Advanced',
      icon: 'server',
      color: 'text-emerald-400',
      desc: 'REST APIs, middleware, CRUD services',
    },
    {
      name: 'Nest.js',
      category: 'backend',
      level: 'Advanced',
      icon: 'boxes',
      color: 'text-pink-400',
      desc: 'Modular APIs, controllers, backend architecture',
    },
    {
      name: 'REST APIs & Auth',
      category: 'backend',
      level: 'Advanced',
      icon: 'network',
      color: 'text-violet-400',
      desc: 'API design, authn/authz, role-based access',
    },
    {
      name: 'Weather API Integration',
      category: 'backend',
      level: 'Intermediate',
      icon: 'cloud-sun',
      color: 'text-sky-400',
      desc: 'Integrating external weather APIs to retrieve location-based conditions',
    },
    {
      name: 'MongoDB',
      category: 'cloud',
      level: 'Advanced',
      icon: 'database',
      color: 'text-indigo-400',
      desc: 'Schemas, queries, CRUD, user data models',
    },
    {
      name: 'PostgreSQL / MySQL',
      category: 'cloud',
      level: 'Intermediate',
      icon: 'table-2',
      color: 'text-blue-400',
      desc: 'SQL queries, schema updates, relational data',
    },
    {
      name: 'Java',
      category: 'backend',
      level: 'Intermediate',
      icon: 'coffee',
      color: 'text-amber-400',
      desc: 'OOP foundations, Infosys Springboard certified',
    },
    {
      name: 'DSA & OOP',
      category: 'tools',
      level: 'Intermediate',
      icon: 'brain',
      color: 'text-yellow-400',
      desc: 'Problem solving, object-oriented design',
    },
    {
      name: 'GitHub / VS Code',
      category: 'tools',
      level: 'Advanced',
      icon: 'git-branch',
      color: 'text-orange-400',
      desc: 'Version control, collaboration, daily tooling',
    },
    {
      name: 'Testing & Debugging',
      category: 'tools',
      level: 'Advanced',
      icon: 'bug',
      color: 'text-rose-400',
      desc: 'Full-stack debugging before release',
    },
  ],
  projects: [
    {
      id: 'villa-vista',
      title: 'Villa Vista',
      category: 'fullstack',
      summary:
        'Vacation rental platform inspired by Airbnb, with property CRUD, real-time booking, secure authentication, and a responsive interface.',
      imageBg: 'from-brand-900 to-indigo-950',
      tech: ['Node.js', 'Express', 'MongoDB', 'EJS'],
      demoUrl: 'https://github.com/Smitraj24',
      githubUrl: 'https://github.com/Smitraj24',
      highlight: '🏠 Booking + Listings',
      caseStudy: {
        problem:
          'Needed an end-to-end rental marketplace where users could list properties, browse stays, and book without a fragmented admin/user flow.',
        architecture:
          'Built with Node.js, Express, MongoDB, and EJS server-rendered views. Listings use full CRUD, bookings are handled in real time, and authentication gates user-specific actions.',
        metrics: [
          'End-to-end listing and booking flow on a single stack.',
          'Secure user authentication for protected booking actions.',
          'Responsive UI for browsing and managing properties.',
        ],
        lessons:
          'Server-rendered EJS plus MongoDB CRUD kept listing and booking logic close to the data model, which simplified auth-protected operations.',
      },
    },
    {
      id: 'password-manager',
      title: 'Password Manager',
      category: 'fullstack',
      summary:
        'Secure password manager with Bcrypt encryption, user-specific access control, and a React frontend talking to a Node/Express/Mongo API.',
      imageBg: 'from-emerald-950 to-slate-950',
      tech: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Bcrypt'],
      demoUrl: 'https://github.com/Smitraj24',
      githubUrl: 'https://github.com/Smitraj24',
      highlight: '🔒 Bcrypt + Access Control',
      caseStudy: {
        problem:
          'Users needed a private vault for credentials without exposing plaintext secrets or leaking one user’s records to another.',
        architecture:
          'React.js frontend with a Node.js/Express API and MongoDB. Passwords are hashed with Bcrypt, and authorization scopes vault data to the authenticated user.',
        metrics: [
          'User-specific vault isolation via access control.',
          'Bcrypt hashing for stored credentials.',
          'Full-stack CRUD for managing saved passwords.',
        ],
        lessons:
          'Auth and encryption have to sit in the API layer, not only the UI, so access control stays consistent across every route.',
      },
    },
    {
      id: 'super-admin-panel',
      title: 'Super Admin Panel & Dashboard',
      category: 'fullstack',
      summary:
        'Admin dashboard and user-management modules with role-based access, CRUD, REST API integration, and authentication — built during real-world project work at Krishang Technolab.',
      imageBg: 'from-violet-950 to-slate-950',
      tech: ['React.js', 'Next.js', 'Nest.js', 'REST APIs', 'MongoDB', 'PostgreSQL'],
      demoUrl: 'https://github.com/Smitraj24',
      githubUrl: 'https://github.com/Smitraj24',
      highlight: '🛡️ RBAC Dashboards',
      caseStudy: {
        problem:
          'Internal teams needed a super admin panel to manage users, roles, and operational data without exposing privileged actions to regular users.',
        architecture:
          'Frontend dashboards in React/Next connected to Nest.js/Express REST APIs. Role-based access, authentication, and CRUD across MongoDB and PostgreSQL power user-management modules.',
        metrics: [
          'Role-based user management and CRUD modules.',
          'Authenticated REST integration between UI and APIs.',
          'Responsive admin interfaces tested before release.',
        ],
        lessons:
          'Clear role boundaries and API-backed CRUD keep admin dashboards maintainable as features grow.',
      },
    },
  ],
  experience: [
    {
      role: 'Full-Stack Developer',
      company: 'Krishang Technolab',
      period: '4 months (Present)',
      meta: 'Full-time • Web applications end to end',
      color: 'brand',
      bullets: [
        'Develop and maintain full-stack web applications using React.js, Next.js, Node.js, Nest.js, Express.js, MongoDB, and PostgreSQL.',
        'Build and integrate REST APIs connecting frontend interfaces with backend services and databases.',
        'Implement authentication and authorization flows to secure application features and user data.',
        'Perform database operations (CRUD, queries, schema updates) across MongoDB and PostgreSQL, and debug issues to maintain stability and performance.',
        'Develop and refine responsive UI components, collaborating on feature development from requirements to working, tested functionality.',
      ],
      tech: ['React.js', 'Next.js', 'Node.js', 'Nest.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
    },
    {
      role: 'Web Development Intern',
      company: 'Krishang Technolab',
      period: '5 months',
      meta: 'Internship • Super Admin Panel & dashboards',
      color: 'indigo',
      bullets: [
        'Contributed to real-world projects, including Super Admin Panel and dashboard development, and built user-management modules covering role-based access, user data handling, and CRUD operations.',
        'Implemented authentication features and integrated REST APIs to connect frontend and backend systems.',
        'Developed responsive, user-friendly web interfaces and assisted in debugging and testing to improve reliability before release.',
      ],
      tech: ['React.js', 'REST APIs', 'Auth', 'Dashboards', 'CRUD'],
    },
  ],
  snippets: [
    {
      key: 'auth-guard',
      file: 'auth.guard.ts',
      label: 'Auth guard',
    },
    {
      key: 'crud-service',
      file: 'users.service.ts',
      label: 'CRUD service',
    },
    {
      key: 'useDebounce',
      file: 'useDebounce.ts',
      label: 'React hook',
    },
  ],
  resumeFileName: 'Smitraj_Makvana_FullStack_Resume.pdf',
};
