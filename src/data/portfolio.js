export const profile = {
  name: "Karvin Nanda",
  roles: ["Software Engineer", "Backend Developer"],
  tagline:
    "A software engineer with a passion for cybersecurity and a sharp eye for emerging AI technologies. Constantly exploring new tools, frameworks, and methodologies to stay ahead of the curve.",
  email: "karvin.nanda@gmail.com",
  github: "https://github.com/karvinNanda",
  linkedin: "https://www.linkedin.com/in/karvin~nanda/",
  // Hero snapshot card (quick read for recruiters)
  focus: ["Backend", "Security"],
  coreStack: ["Go", "Laravel", "Vue 3", "MySQL", "Docker"]
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

// Descriptions, tech and architecture are taken from each repo's README (checked 2026-10-04).
// architecture: left-to-right stages, rendered by ArchDiagram.vue.
export const projects = [
  {
    name: "WatchTower",
    description:
      "Multi-user platform that watches crypto, stock and gold prices plus CVE and security feeds (NVD, CISA KEV, advisories). Two scheduled workers run DeepSeek AI analysis and send bilingual alerts through two Telegram bots.",
    tech: ["Gin Gonic", "Vue.js 3", "MySQL", "Redis", "Docker", "Nginx"],
    repo: "https://github.com/KarvinNanda/watchtower",
    architecture: [
      { stage: "Client", nodes: ["Vue 3 dashboard"] },
      { stage: "Core", nodes: ["Gin API · JWT cookie", "Scheduler · 4h / 6h"] },
      { stage: "Data & services", nodes: ["MySQL + Redis", "Market & CVE feeds", "DeepSeek AI", "Telegram bots"] }
    ]
  },
  {
    name: "Ballet School Management",
    description:
      "Operations app for a ballet studio: classes, schedules, attendance, student billing and stock sales. Five roles (Head, Admin, Teacher, Finance, Buyer), each with its own middleware and dashboard, plus PDF reports.",
    tech: ["Laravel", "MySQL", "Bootstrap 5"],
    repo: "https://github.com/KarvinNanda/Ballet",
    architecture: [
      { stage: "Client", nodes: ["Browser · Blade views"] },
      { stage: "Core", nodes: ["Laravel 9", "Role middleware × 5"] },
      { stage: "Data & services", nodes: ["MySQL", "DomPDF reports", "Email · password reset"] }
    ]
  },
  {
    name: "Dorm Monitoring",
    description:
      "Internal frontend for dorm operations: daily tap-in / tap-out attendance, guest visits, inventory, facility reservations and user management, with role-based route guards and push notifications.",
    tech: ["Vue.js 3", "Pinia", "Tailwind CSS"],
    repo: "https://github.com/KarvinNanda/dorm-monitoring-fe",
    architecture: [
      { stage: "Client", nodes: ["Vue 3 SPA", "Pinia · role guards"] },
      { stage: "Backend", nodes: ["REST API · separate repo"] },
      { stage: "Services", nodes: ["OneSignal push"] }
    ]
  },
  {
    name: "Game Lounge — Customer App",
    description:
      "Customer web app for a gaming lounge: a 5-step room booking flow (branch, room, date, slot, checkout), private event booking, play credits top-up for members, vouchers and booking history.",
    tech: ["Vue.js 3", "Pinia", "Tailwind CSS", "Vitest"],
    repo: "https://github.com/KarvinNanda/game_lounge_customer",
    architecture: [
      { stage: "Client", nodes: ["Vue 3 + Pinia", "Auth guard · redirect"] },
      { stage: "Backend", nodes: ["Game Lounge API"] },
      { stage: "Features", nodes: ["Room booking", "Event booking", "Play credits"] }
    ]
  },
  {
    name: "Game Lounge — Admin Dashboard",
    description:
      "Admin dashboard for branch management: bookings, pricing, customers and sales. Routes are gated by permissions, with ECharts dashboards and Excel / PDF export.",
    tech: ["Vue.js 3", "Element Plus", "ECharts"],
    repo: "https://github.com/KarvinNanda/game_lounge_fe",
    architecture: [
      { stage: "Client", nodes: ["Vue 3 + Element Plus", "Permission guard"] },
      { stage: "Backend", nodes: ["Game Lounge API"] },
      { stage: "Output", nodes: ["ECharts dashboards", "Excel / PDF export"] }
    ]
  },
  {
    name: "Game Lounge — Backend API",
    description:
      "REST API behind both Game Lounge apps: stores and rooms, a pricing engine (happy hour, packages, flash sales), bookings and event bookings, play credits, vouchers, sales reports, and role-based staff access with JWT.",
    tech: ["Gin Gonic", "GORM", "MySQL"],
    repo: "https://github.com/KarvinNanda/game_lounge_be",
    architecture: [
      { stage: "Clients", nodes: ["Customer app", "Admin dashboard"] },
      { stage: "Core", nodes: ["Gin · JWT + roles", "Pricing engine", "Booking · credits · voucher"] },
      { stage: "Data & services", nodes: ["GORM → MySQL", "SMTP email"] }
    ]
  }
]

import redTeamCert from '@/assets/certifications/Certified Red Team Operations Management.jpg'
import socCert from '@/assets/certifications/JH - SOC L1.jpg'

export const achievements = [
  {
    title: "Certified Red Team Operations Management",
    shortTitle: "CRTOM",
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
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" }
]
