export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface SkillCategory {
  category: string;
  badgeColor: string;
  skills: { name: string; level: "Proficient" | "Hands-on" | "Foundational" }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  role: string;
  period: string;
  techStack: string[];
  keyHighlights: string[];
  architecturePoints: { title: string; desc: string }[];
  githubUrl?: string;
}

export const KISHORE_PROFILE = {
  name: "Kishore Reddy",
  agentName: "Sara",
  targetRoles: ["QA Automation Engineer", "Software Test Engineer", "SDET (Entry-Level)"],
  currentLocation: "Palamaner, Chittoor, Tirupati, Andhra Pradesh",
  relocation: "Open to Relocate to Bengaluru & Chennai",
  noticePeriod: "Immediate Joiner (0 Days)",
  phone: "+91 9390542261",
  email: "kishorreddy9000@gmail.com",
  linkedin: "https://linkedin.com/in/kishor-reddy-78243328b",
  linkedinHandle: "kishor-reddy-78243328b",
  github: "https://github.com/Kishore-9000",
  githubHandle: "Kishore-9000",
  portfolio: "Kishore Reddy — QA Automation Portfolio",

  summary:
    "QA Automation Engineer with hands-on training in Selenium WebDriver, Java, TestNG, SQL, REST API testing, and Manual Testing. Built robust test automation frameworks using Page Object Model (POM), automated 25+ end-to-end scenarios, conducted deep SQL data validation and REST API testing, and worked in Agile Scrum methodology. Looking for an entry-level QA Automation / SDET position.",

  metrics: [
    { label: "Selenium Scripts", value: "30+", desc: "Automated end-to-end tests" },
    { label: "SQL Problems Solved", value: "400+", desc: "Joins, subqueries, DB testing" },
    { label: "E2E Test Scenarios", value: "25+", desc: "Login, Cart, Checkout, Pay" },
    { label: "Academic CGPA", value: "8.06", desc: "BCA (2023 - 2026)" },
    { label: "Joining Time", value: "Immediate", desc: "0 Days notice period" },
  ],

  strengths: [
    "Selenium WebDriver & Core Java automation with robust locator strategies (XPath & CSS)",
    "Modular Page Object Model (POM) and Data-Driven test framework architecture",
    "Comprehensive SQL data validation with 400+ complex queries solved",
    "REST API inspection and test collection creation using Postman",
    "Quick learner with disciplined hands-on practice and Agile Scrum defect management",
  ],

  areasToImprove: [
    {
      area: "CI/CD & Jenkins Integration",
      status: "Foundational (Actively Learning)",
      details: "Understands Jenkins and basic build triggers; actively practicing pipeline automation and continuous test triggers.",
    },
    {
      area: "REST Assured Frameworks",
      status: "Basics Known",
      details: "Strong in Postman API testing; currently advancing into code-based REST Assured assertions and request specifications.",
    },
    {
      area: "Real-time Industry Experience",
      status: "Training / Internship Phase",
      details: "Compensating for fresher status with 30+ production-grade scripts, 400+ SQL problem solutions, and modular POM frameworks.",
    },
  ],

  skillsData: [
    {
      category: "Automation Testing",
      badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      skills: [
        { name: "Selenium WebDriver", level: "Proficient" },
        { name: "TestNG & Assertions", level: "Proficient" },
        { name: "Page Object Model (POM)", level: "Proficient" },
        { name: "Maven Build Tool", level: "Hands-on" },
        { name: "Data-Driven Framework", level: "Hands-on" },
        { name: "Hybrid Framework", level: "Hands-on" },
        { name: "XPath & CSS Selectors", level: "Proficient" },
        { name: "Explicit / Implicit Waits", level: "Proficient" },
        { name: "DataProvider Annotation", level: "Proficient" },
        { name: "Selenium Grid (Basics)", level: "Foundational" },
      ],
    },
    {
      category: "Programming & Database",
      badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      skills: [
        { name: "Core Java (OOP, Collections)", level: "Proficient" },
        { name: "Exception Handling", level: "Proficient" },
        { name: "SQL (Joins, Subqueries)", level: "Proficient" },
        { name: "Database Validation", level: "Proficient" },
        { name: "HTML & CSS", level: "Hands-on" },
        { name: "JavaScript", level: "Hands-on" },
      ],
    },
    {
      category: "Manual Testing & QA Methodologies",
      badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      skills: [
        { name: "SDLC & STLC", level: "Proficient" },
        { name: "Functional & Regression", level: "Proficient" },
        { name: "Smoke & Sanity Testing", level: "Proficient" },
        { name: "Integration & UAT", level: "Hands-on" },
        { name: "Defect Life Cycle & Jira", level: "Proficient" },
        { name: "RTM (Traceability Matrix)", level: "Proficient" },
        { name: "Test Plan & Bug Reports", level: "Proficient" },
      ],
    },
    {
      category: "API Testing & Dev Tools",
      badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      skills: [
        { name: "Postman Collections", level: "Proficient" },
        { name: "REST APIs & HTTP Methods", level: "Proficient" },
        { name: "JSON & JSON Parsing", level: "Proficient" },
        { name: "REST Assured (Basics)", level: "Foundational" },
        { name: "Git & GitHub", level: "Hands-on" },
        { name: "IntelliJ IDEA & Eclipse", level: "Proficient" },
        { name: "Jenkins & CI/CD (Basics)", level: "Foundational" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "ecommerce-framework",
      title: "E-Commerce Web Application Automation Framework",
      tagline: "End-to-End Modular Automation Suite with Database & API Verification",
      role: "QA Automation Engineer (Lead Project)",
      period: "2026",
      techStack: ["Selenium WebDriver", "Java", "TestNG", "Maven", "POM", "SQL", "Postman", "Git"],
      keyHighlights: [
        "Automated 25+ end-to-end critical user journeys: Registration, Login, Product Search, Shopping Cart, Checkout, and Payment gateway simulations.",
        "Engineered a scalable Page Object Model (POM) architecture separating web page locators from test logic for maximum maintainability.",
        "Implemented SQL data-driven test cases validating backend database states (user table updates, order ID generation, stock decrement) against UI actions.",
        "Used Postman collections to perform pre-test and post-test API verification of REST endpoints and JSON responses.",
        "Configured TestNG parallel test execution to significantly reduce regression test cycle time.",
      ],
      architecturePoints: [
        { title: "Design Pattern", desc: "Page Object Model (POM) with Page Factory and reusable helper utilities." },
        { title: "Data Handling", desc: "TestNG @DataProvider for external parameterized data injection and SQL datasets." },
        { title: "Synchronization", desc: "Robust Explicit Waits (WebDriverWait) handling dynamic AJAX elements and loaders." },
        { title: "Defect Logging", desc: "Integrated reporting with screenshots captured on test failure." },
      ],
    },
    {
      id: "attendance-management",
      title: "Attendance Management System (QA & Development)",
      tagline: "Full Lifecycle QA with Database CRUD Operations & Test Documentation",
      role: "QA Tester & Java Developer",
      period: "2025 - 2026",
      techStack: ["Java", "SQL", "HTML", "CSS", "Manual Testing"],
      keyHighlights: [
        "Developed full attendance recording application with Java backend and SQL database CRUD operations.",
        "Authored 20+ comprehensive manual test cases covering positive, negative, and edge boundary conditions.",
        "Formulated Requirements Traceability Matrix (RTM) linking 100% of functional requirements to test scenarios.",
        "Performed backend database testing with SQL queries to verify inserts, updates, deletes, and foreign key integrity.",
        "Logged and tracked defects through the complete Defect Life Cycle.",
      ],
      architecturePoints: [
        { title: "Database Layer", desc: "Relational SQL tables for students, faculty, and daily attendance logs." },
        { title: "Test Artifacts", desc: "Test Scenarios, Test Cases, Bug Reports, and RTM." },
      ],
    },
  ] as ProjectItem[],

  experience: [
    {
      role: "QA Automation Trainee",
      company: "QSpiders Main Branch (Basavanagudi, Bengaluru)",
      type: "Intensive Hands-On Training / Internship",
      period: "Jan 2026 – Sep 2026",
      location: "Bengaluru, Karnataka",
      points: [
        "Authored and executed 30+ Selenium WebDriver test scripts using Core Java, TestNG, and Maven.",
        "Designed and established a reusable Page Object Model (POM) test architecture.",
        "Conducted Functional, Regression, Smoke, Sanity, Cross-Browser, and API testing sessions.",
        "Performed SQL data validation to verify database consistency following UI operations.",
        "Logged, classified, and tracked defects in Jira while actively collaborating in simulated Agile Scrum sprints.",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Mother Theresa Degree College",
      period: "2023 – 2026",
      score: "CGPA: 8.06",
      status: "Completed / Graduating 2026",
    },
  ],

  certifications: [
    { name: "Selenium WebDriver with TestNG & POM", issuer: "QA Professional Training" },
    { name: "API Testing with Postman", issuer: "Technical Certification" },
    { name: "Java Programming", issuer: "Software Engineering Division" },
    { name: "Fundamentals of Software Testing", issuer: "QA Standards Institute" },
  ],

  achievements: [
    "Solved 400+ SQL practice problems covering complex multi-table joins, subqueries, and aggregate validations.",
    "Engineered 30+ Selenium WebDriver automation scripts using Java and TestNG.",
    "Formulated 20+ comprehensive manual test cases and defect reports.",
    "Published automated test suites, SQL projects, and Postman collections on GitHub.",
  ],

  suggestedQuestions: [
    "Why should we hire Kishore?",
    "Explain his E-Commerce POM Framework",
    "What is his SQL & API testing experience?",
    "Availability, notice period & relocation?",
    "What are his strengths & areas to improve?",
    "Can you share Kishore's contact details?",
  ],
};
