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

// Descriptions, tech and architecture are taken from each repo's default branch.
// WatchTower: code, re-checked 2026-10-16. Game Lounge Customer: code + README, re-checked 2026-10-20.
// Other projects: code + README, re-checked 2026-10-10.
// architecture: left-to-right stages, rendered by ArchDiagram.vue.
// highlights: max 3 short proof points (test file counts are file counts, not coverage).
export const projects = [
  {
    name: "WatchTower",
    description:
      "Self-hostable, multi-user alerting for crypto, stocks and Antam gold (priced in rupiah), plus a threat-intel feed from NVD, CISA KEV, GitHub advisories, Exploit-DB and security news. Users set price-level, 24h-change, trailing-stop and 52-week-break rules; two scheduled pipelines check them and alert through two Telegram bots.",
    tech: ["Gin Gonic", "Vue.js 3", "MySQL", "Redis", "Docker", "Nginx"],
    repo: "https://github.com/KarvinNanda/watchtower",
    architecture: [
      { stage: "Client", nodes: ["Vue 3 dashboard · EN / ID"] },
      { stage: "Core", nodes: ["Gin API · httpOnly JWT", "Scheduler · 4h / 6h", "Redis queue · manual runs"] },
      { stage: "Data & services", nodes: ["MySQL + Redis", "Market APIs + IDR rate", "Threat-intel feeds", "Telegram bots"] }
    ],
    highlights: ["66 test files · go test -race", "CI · govulncheck, gosec, npm audit", "Daily API credit budget"]
  },
  {
    name: "Ballet School Management",
    description:
      "Operations app for a ballet studio: classes, schedules, attendance, student billing, stock sales and PDF reports. Five roles (Head, Admin, Teacher, Finance, Buyer) are enforced by role middleware and Gates, and attendance is blocked until required payments are made.",
    tech: ["Laravel", "MySQL", "Bootstrap 5", "PHPUnit"],
    repo: "https://github.com/KarvinNanda/Ballet",
    architecture: [
      { stage: "Client", nodes: ["Browser · Blade + Bootstrap"] },
      { stage: "Core", nodes: ["Laravel 13 · PHP 8.4", "Role middleware + Gates"] },
      { stage: "Data & services", nodes: ["MySQL 8", "DomPDF reports", "SMTP email"] }
    ],
    highlights: ["100 PHPUnit test files", "HTML sanitized · HTMLPurifier", "CI · audit + tests"]
  },
  {
    name: "Dorm Monitoring",
    description:
      "Internal dorm management frontend: daily tap-in / tap-out attendance, guest visit logs, inventory with stock transactions, facility reservations and user management. Routes are guarded per role (admin, resident, receptionist, guest), JWTs refresh automatically, and alerts arrive as push notifications.",
    tech: ["Vue.js 3", "Pinia", "Tailwind CSS", "Vitest"],
    repo: "https://github.com/KarvinNanda/dorm-monitoring-fe",
    architecture: [
      { stage: "Client", nodes: ["Vue 3 SPA", "Role guards · JWT refresh"] },
      { stage: "Backend", nodes: ["NestJS API · separate repo", "PostgreSQL"] },
      { stage: "Services", nodes: ["OneSignal push"] }
    ],
    highlights: ["31 test files · security suite", "Refresh-token request queue", "CI · build + test + audit"]
  },
  {
    name: "Game Lounge — Customer App",
    description:
      "Customer web app for a gaming lounge chain: room booking in locked steps (branch → room → date → time) with server-side pricing, private venue booking, play credits, vouchers and F&B ordering during a session. Payments run through Xendit checkout, the session lives in an httpOnly cookie, and a test blocks raw hex colors in components.",
    tech: ["Vue.js 3", "Pinia", "Tailwind CSS", "Vitest"],
    repo: "https://github.com/KarvinNanda/game_lounge_customer",
    architecture: [
      { stage: "Client", nodes: ["Vue 3 + Pinia", "Locked-step checkout", "httpOnly cookie session"] },
      { stage: "Backend", nodes: ["Game Lounge API"] },
      { stage: "Payments", nodes: ["Xendit checkout", "Webhook confirms booking"] }
    ],
    highlights: ["74 test files", "Payment host allowlist", "CI · audit, test, coverage"]
  },
  {
    name: "Game Lounge — Admin Dashboard",
    description:
      "Admin dashboard for a multi-branch gaming lounge: live booking grid, pricing, customers, play credits, vouchers, staff and roles, and a sales dashboard with Excel / PDF export. Every route and menu is gated by permission keys and scoped to the staff member's branches.",
    tech: ["Vue.js 3", "Element Plus", "ECharts", "Vitest"],
    repo: "https://github.com/KarvinNanda/game_lounge_fe",
    architecture: [
      { stage: "Client", nodes: ["Vue 3 + Element Plus", "Permission + branch guards"] },
      { stage: "Backend", nodes: ["Game Lounge API · cookie auth"] },
      { stage: "Output", nodes: ["ECharts dashboards", "Excel / PDF export"] }
    ],
    highlights: ["48 test files", "CSP + HSTS via nginx", "CI · audit, lint, test, build"]
  },
  {
    name: "Game Lounge — Backend API",
    description:
      "Go REST API behind both Game Lounge apps. A pricing engine combines happy hour, flash sales and the cheapest package mix (dynamic programming); bookings are held for 15 minutes until a Xendit webhook confirms payment. Also covers play credits, vouchers, F&B synced from Moka POS, and sales reports.",
    tech: ["Gin Gonic", "GORM", "MySQL"],
    repo: "https://github.com/KarvinNanda/game_lounge_be",
    architecture: [
      { stage: "Clients", nodes: ["Customer app", "Admin dashboard"] },
      { stage: "Core", nodes: ["Gin · cookie JWT + permissions", "Pricing engine · DP", "Booking holds · 15 min"] },
      { stage: "Data & services", nodes: ["GORM → MySQL", "Xendit webhooks", "SMTP · Moka POS"] }
    ],
    highlights: ["53 Go test files · -race", "JWT token versioning", "CI · vet + test"]
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
