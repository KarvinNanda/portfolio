export const profile = {
  name: "Karvin Nanda",
  roles: ["Software Engineer", "Backend Developer", "Blue Team", "Cybersecurity Analyst"],
  tagline:
    "A software engineer with a passion for cybersecurity and a sharp eye for emerging AI technologies. Constantly exploring new tools, frameworks, and methodologies to stay ahead of the curve.",
  email: "karvin.nanda@gmail.com",
  github: "https://github.com/karvinNanda",
  linkedin: "https://www.linkedin.com/in/karvin~nanda/"
}

export const experiences = [
  {
    company: "Purwanto Asset Management",
    role: "Fullstack Developer",
    period: "Feb 2025 — Present",
    description:
      "Collaborating with the management team to develop internal applications. Building portfolio and account reporting systems for clients."
  },
  {
    company: "PT. Mixtra Inti Tekindo",
    role: "Backend Developer",
    period: "2023 — 2025",
    duration: "2 years",
    description:
      "Developed APIs connecting Transport Management System (TMS), Warehouse Management System (WMS), and E-Commerce platforms. Optimized application performance and managed server infrastructure."
  },
  {
    company: "Bina Nusantara IT Division",
    role: "Fullstack Developer",
    period: "2022 — 2023",
    duration: "6 months",
    description:
      "Built an academic information system similar to PDDIKTI. Developed administration modules including lecturer and student registration, authentication, and role-based authorization."
  }
]

export const skills = {
  languages: ["Golang", "PHP", "Java", "C#", "C++"],
  frameworks: ["Gin Gonic", "Laravel", ".NET Core", "Vue.js 3"],
  database: ["MySQL", "SQL Server", "Redis"],
  infrastructure: ["Linux", "Docker", "Nginx", "Git"],
  spoken: [
    { name: "English", level: "Intermediate" },
    { name: "Indonesian", level: "Proficient" },
    { name: "Chinese", level: "Basic" }
  ]
}

export const projects = [
  {
    name: "WatchTower",
    description:
      "AI-powered finance & security intelligence platform. Monitors crypto, stocks, and gold prices alongside CVE and security news, then delivers personalized bilingual summaries to Telegram.",
    tech: ["Gin Gonic", "Vue.js 3", "MySQL", "Docker", "Nginx"],
    repo: "https://github.com/KarvinNanda/watchtower"
  },
  {
    name: "Ballet School Management",
    description:
      "A ballet school management system featuring attendance tracking, attendance reports, class creation, student enrollment, and multi-role access (teacher, student, admin) with role-based authorization.",
    tech: ["Laravel", "MySQL"],
    repo: "https://github.com/KarvinNanda/Ballet"
  },
  {
    name: "Dorm Monitoring",
    description:
      "A frontend application for monitoring dormitory facilities, tracking room status and maintenance needs.",
    tech: ["Vue.js 3"],
    repo: "https://github.com/KarvinNanda/dorm-monitoring-fe"
  },
  {
    name: "Game Lounge — Customer App",
    description:
      "Customer-facing frontend for a PlayStation rental service. Users can browse available consoles, view pricing, and make reservations.",
    tech: ["Vue.js 3"],
    repo: "https://github.com/KarvinNanda/game_lounge_customer"
  },
  {
    name: "Game Lounge — Admin Dashboard",
    description:
      "Admin panel for managing PlayStation rental operations including console availability, booking management, and revenue tracking.",
    tech: ["Vue.js 3"],
    repo: "https://github.com/KarvinNanda/game_lounge_fe"
  },
  {
    name: "Game Lounge — Backend API",
    description:
      "RESTful API powering the Game Lounge platform. Handles authentication, console management, booking logic, and payment processing.",
    tech: ["Gin Gonic", "MySQL"],
    repo: "https://github.com/KarvinNanda/game_lounge_be"
  }
]

import redTeamCert from '@/assets/certifications/Certified Red Team Operations Management.jpg'
import socCert from '@/assets/certifications/JH - SOC L1.jpg'

export const achievements = [
  {
    title: "Certified Red Team Operations Management",
    type: "certification",
    image: redTeamCert
  },
  {
    title: "Junior SOC Analyst Level 1",
    shortTitle: "JH - SOC L1",
    type: "certification",
    image: socCert
  }
]

export const navLinks = [
  { label: "About", href: "#hero" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" }
]
