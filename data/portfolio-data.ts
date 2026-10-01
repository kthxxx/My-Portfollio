export const profile = {
  name: "Keith Justin Emeterio",
  shortName: "Keith Justin",
  role: "Computer Science student, developer, designer, and creative",
  location: "Philippines",
  language: "Cebuano / Bisaya",
  school: "University of Cebu",
  degree: "Computer Science",
  statement: "I build digital systems and shape how they feel — moving between code, interfaces, and media with curiosity.",
  bio: [
    "I’m a Computer Science student at the University of Cebu, building across web and mobile development while exploring how design makes technology more useful, legible, and human.",
    "My work ranges from flood-resilient routing and student-record systems to interface design, content, photography, video, and worship music. I’m still growing — but I learn by making real things, solving real problems, and refining the details.",
  ],
} as const;

export type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type VideoProject = {
  id: string;
  title: string;
  role: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  detail: string;
  role: string;
  team: string;
  status: string;
  featuredImage: ProjectImage;
  mockupImage: ProjectImage;
  gallery: ProjectImage[];
  caseStudy: { problem: string; approach: string; outcome: string };
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "seeds-of-life-global",
    name: "Seeds of Life Global",
    category: "Nonprofit Website",
    description: "A responsive public platform for an international nonprofit rooted in Cebu.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Radix UI", "Zod"],
    detail: "I designed and developed the organization's public website, translating its mission, programs, leadership, gallery, volunteer opportunities, contact information, and donation pathways into a clear and responsive experience. The work covered information architecture, brand integration, frontend development, SEO and indexing setup, analytics, and deployment.",
    role: "Web Developer and UI/UX Designer",
    team: "Primarily solo, created with Seeds of Life Global",
    status: "Live",
    featuredImage: { src: "/projects/seeds-of-life-global/gallery.png", alt: "Seeds of Life Global community gallery page", width: 1880, height: 2164 },
    mockupImage: { src: "/projects/mockups/seeds-of-life-global.png", alt: "Seeds of Life Global website shown across laptop and mobile devices", width: 1448, height: 1086 },
    gallery: [
      { src: "/projects/mockups/seeds-of-life-global.png", alt: "Seeds of Life Global website shown across laptop and mobile devices", width: 1448, height: 1086 },
      { src: "/projects/seeds-of-life-global/home.png", alt: "Seeds of Life Global homepage", width: 1880, height: 8182 },
      { src: "/projects/seeds-of-life-global/programs.png", alt: "Seeds of Life Global programs page", width: 1880, height: 6766 },
      { src: "/projects/seeds-of-life-global/gallery.png", alt: "Seeds of Life Global community gallery", width: 1880, height: 2164 },
    ],
    caseStudy: {
      problem: "The organization needed one clear public home for its mission, programs, community stories, volunteering, contact, and donation pathways.",
      approach: "I shaped the information architecture and visual system, then built a responsive site that brings the organization's content and ways to participate together.",
      outcome: "A live public platform presents the nonprofit's work across devices, with clear paths into its programs, gallery, volunteering, and contact information.",
    },
    links: [{ label: "Live website", href: "https://www.seedsoflifeglobal.org" }],
  },
  {
    slug: "bible-voyagers",
    name: "Bible Voyagers",
    category: "Educational Game Platform",
    description: "An offline-first scripture adventure combining a 2D platformer, reading, and comprehension.",
    stack: ["React 19", "TypeScript", "Phaser", "Zustand", "Dexie.js", "Supabase", "Playwright"],
    detail: "Bible Voyagers is a child-safe educational web application for ages 8 to 10. It combines interactive Bible story worlds with a Phaser-powered platformer, scripture reading journals, comprehension quizzes, collectibles, and badges. Offline-first persistence keeps journeys responsive, while caregiver authentication stays separate from each child's in-game persona.",
    role: "Full-stack Developer and Game Experience Designer",
    team: "Independent project",
    status: "In development",
    featuredImage: { src: "/projects/bible-voyagers/game.png", alt: "Bible Voyagers Noah's Ark platform game", width: 1879, height: 993 },
    mockupImage: { src: "/projects/mockups/bible-voyagers.png", alt: "Bible Voyagers educational platform shown on laptop and mobile", width: 1536, height: 1024 },
    gallery: [
      { src: "/projects/mockups/bible-voyagers.png", alt: "Bible Voyagers educational platform shown on laptop and mobile", width: 1536, height: 1024 },
      { src: "/projects/bible-voyagers/home.png", alt: "Bible Voyagers public homepage", width: 1880, height: 4525 },
      { src: "/projects/bible-voyagers/adventures.png", alt: "Bible Voyagers adventure selection", width: 1880, height: 1766 },
      { src: "/projects/bible-voyagers/reading-journal.png", alt: "Bible Voyagers scripture reading journal", width: 1880, height: 1499 },
      { src: "/projects/bible-voyagers/game.png", alt: "The Ark Builders' Valley platform game", width: 1879, height: 993 },
    ],
    caseStudy: {
      problem: "Young readers need a safe, engaging way to explore Bible stories that can remain usable when a connection is unavailable.",
      approach: "I combined story reading, comprehension, collectibles, and a Phaser platform game with offline-first persistence and a separate caregiver account flow.",
      outcome: "The in-development experience connects scripture learning with play while keeping each child's journey responsive offline and distinct from caregiver access.",
    },
  },
  {
    slug: "lifevent",
    name: "LIFEVENT",
    category: "Exhibition Intelligence",
    description: "A high-level concept for discovering and presenting technology exhibition opportunities.",
    stack: ["Web Application", "Data Reporting", "Interface Design", "Brand Systems"],
    detail: "During my internship at Lifewood Data Technology, I contributed to the LIFEVENT concept, interface direction, branding, and presentation materials. The project organizes how technology exhibition opportunities can be discovered, evaluated, prioritized, and communicated as executive intelligence. Internal workflows, implementation details, and company data remain confidential.",
    role: "IT Intern and Developer",
    team: "Internship team at Lifewood Data Technology",
    status: "Internal project",
    featuredImage: { src: "/projects/lifevent/landing.png", alt: "LIFEVENT public-facing landing page", width: 1880, height: 6311 },
    mockupImage: { src: "/projects/mockups/lifevent.png", alt: "LIFEVENT exhibition intelligence platform shown on laptop and mobile", width: 1448, height: 1086 },
    gallery: [
      { src: "/projects/mockups/lifevent.png", alt: "LIFEVENT exhibition intelligence platform shown on laptop and mobile", width: 1448, height: 1086 },
      { src: "/projects/lifevent/landing.png", alt: "LIFEVENT public-facing landing page", width: 1880, height: 6311 },
    ],
    caseStudy: {
      problem: "Technology exhibition opportunities needed a clearer way to be discovered, evaluated, prioritized, and presented to decision-makers.",
      approach: "As an intern, I contributed to the concept, interface direction, branding, and presentation materials for an exhibition-intelligence experience.",
      outcome: "The work established a high-level product direction. Internal workflows and company data remain confidential.",
    },
  },
  {
    slug: "sentinelai",
    name: "SentinelAI",
    category: "AI Surveillance System",
    description: "A locally hosted vision-language system for monitoring, processing, and incident reporting.",
    stack: ["Spring Boot", "PostgreSQL", "React Native", "Expo", "REST APIs", "LM Studio", "Qwen3-VL-4B"],
    detail: "I designed and built the end-to-end architecture connecting a mobile interface, backend APIs, PostgreSQL, and a locally hosted vision-language model. SentinelAI supports live monitoring, video upload and processing, and structured incident reports without depending on a public cloud AI service.",
    role: "Full-stack Developer",
    team: "Primarily solo development project",
    status: "Local development",
    featuredImage: { src: "/projects/sentinelai/incident-reports.jpg", alt: "SentinelAI incident reports interface", width: 2730, height: 1536 },
    mockupImage: { src: "/projects/mockups/sentinelai.png", alt: "SentinelAI surveillance platform shown on laptop and mobile", width: 1536, height: 1024 },
    gallery: [
      { src: "/projects/mockups/sentinelai.png", alt: "SentinelAI surveillance platform shown on laptop and mobile", width: 1536, height: 1024 },
      { src: "/projects/sentinelai/dashboard.png", alt: "SentinelAI main dashboard", width: 1280, height: 1024 },
      { src: "/projects/sentinelai/live-monitoring.png", alt: "SentinelAI live monitoring feed", width: 1280, height: 1048 },
      { src: "/projects/sentinelai/upload-processing.png", alt: "SentinelAI video upload and processing screen", width: 1280, height: 1528 },
      { src: "/projects/sentinelai/incident-reports.jpg", alt: "SentinelAI incident reports archive", width: 2730, height: 1536 },
    ],
    caseStudy: {
      problem: "A monitoring workflow needed to connect live video, uploaded footage, and incident reporting while keeping vision-language processing local.",
      approach: "I connected a mobile interface, backend APIs, PostgreSQL, and a locally hosted vision-language model across monitoring and video-processing flows.",
      outcome: "The local-development system supports live monitoring, upload processing, and structured incident reports without relying on a public cloud AI service.",
    },
  },
  {
    slug: "ridequest",
    name: "RideQuest",
    category: "Mobile Car Rental",
    description: "A mobile rental platform with dedicated customer and administrative experiences.",
    stack: ["Kotlin", "Jetpack Compose", "Material 3", "Navigation Compose", "Firebase", "Figma"],
    detail: "RideQuest is a car rental application designed for the Philippine market. I led the application architecture and interface implementation while coordinating task delegation, feature scope, and delivery. The product includes onboarding, validated authentication, vehicle discovery, booking flows, customer profiles, and an administrative management experience.",
    role: "Full-stack Developer and Project Manager",
    team: "Team project",
    status: "Built",
    featuredImage: { src: "/projects/ridequest/search.jpg", alt: "RideQuest vehicle search interface", width: 412, height: 1291 },
    mockupImage: { src: "/projects/mockups/ridequest.png", alt: "RideQuest mobile car rental application shown across three phones", width: 1354, height: 1161 },
    gallery: [
      { src: "/projects/mockups/ridequest.png", alt: "RideQuest mobile car rental application shown across three phones", width: 1354, height: 1161 },
      { src: "/projects/ridequest/search.jpg", alt: "RideQuest vehicle search interface", width: 412, height: 1291 },
      { src: "/projects/ridequest/vehicle-details.jpg", alt: "RideQuest vehicle details screen", width: 412, height: 1110 },
      { src: "/projects/ridequest/booking.jpg", alt: "RideQuest booking details screen", width: 412, height: 1218 },
      { src: "/projects/ridequest/profile.png", alt: "RideQuest customer profile", width: 412, height: 917 },
    ],
    caseStudy: {
      problem: "Renters needed a mobile way to discover vehicles and book them, while administrators needed a dedicated management experience.",
      approach: "I led architecture and interface implementation, coordinating feature scope and delivery across onboarding, authentication, discovery, booking, and profile flows.",
      outcome: "The built Android application covers the customer rental journey and supports a separate administrative experience for managing the service.",
    },
    links: [{ label: "GitHub repository", href: "https://github.com/kthxxx/RideQuest-Car-Rental-Management-System" }],
  },
];

export const skillGroups = [
  { index: "01", label: "Development", items: ["React", "React Native", "Python", "FastAPI", "Firebase"] },
  { index: "02", label: "Interface", items: ["Frontend Development", "UI/UX", "Figma", "Responsive Design"] },
  { index: "03", label: "Systems", items: ["NetworkX", "Data", "Computer Architecture", "Formal Languages"] },
  { index: "04", label: "Creative", items: ["Graphic Design", "Photography", "Video Editing", "Content Creation", "Worship Music"] },
] as const;

export const creativeAreas = [
  { index: "001", title: "Graphic Design", state: "20 featured works" },
  { index: "002", title: "Video & Media", state: "4 selected videos" },
] as const;

export type GraphicDesignProject = {
  title: string;
  category: "School" | "Conference" | "Logo";
  src: string;
  width: number;
  height: number;
};

export const graphicDesignProjects: GraphicDesignProject[] = [
  { title: "Work With Heart", category: "School", src: "/graphic-design/School/Inspire Create Innovate - Work With Heart .png", width: 800, height: 800 },
  { title: "Inspire Create Innovate I", category: "School", src: "/graphic-design/School/Inspire Create Innovate (1).png", width: 667, height: 800 },
  { title: "Inspire Create Innovate II", category: "School", src: "/graphic-design/School/Inspire Create Innovate.png", width: 667, height: 800 },
  { title: "Inspire Create Innovate III", category: "School", src: "/graphic-design/School/Inspire Create Innovate - Artboard 1 (3).png", width: 640, height: 800 },
  { title: "Inspire Create Innovate IV", category: "School", src: "/graphic-design/School/Inspire Create Innovate - Artboard 1 (2).png", width: 640, height: 800 },
  { title: "Inspire Create Innovate V", category: "School", src: "/graphic-design/School/Inspire Create Innovate - Artboard 1 (1).png", width: 640, height: 800 },
  { title: "Culture", category: "School", src: "/graphic-design/School/Inspire Create Innovate - Culture.png", width: 800, height: 248 },
  { title: "Overwork", category: "School", src: "/graphic-design/School/Inspire Create Innovate - Overwork.png", width: 800, height: 179 },
  { title: "Inspire Create Innovate VI", category: "School", src: "/graphic-design/School/Inspire Create Innovate - Artboard 1.png", width: 640, height: 800 },
  { title: "Retro Computer Master I", category: "School", src: "/graphic-design/School/Retro Computer Master Cute Mascot (1).png", width: 640, height: 800 },
  { title: "Retro Computer Master II", category: "School", src: "/graphic-design/School/Retro Computer Master Cute Mascot.png", width: 640, height: 800 },
  { title: "Countdown 8", category: "Conference", src: "/graphic-design/Conference/countdown 8.jpg", width: 940, height: 788 },
  { title: "Code Red Media", category: "Conference", src: "/graphic-design/Conference/Code Red Media.jpg", width: 940, height: 788 },
  { title: "Code Red", category: "Conference", src: "/graphic-design/Conference/CoDE RED.jpg", width: 940, height: 788 },
  { title: "AIGNITE", category: "Logo", src: "/graphic-design/Logo/AIGNITE.png", width: 3500, height: 2188 },
  { title: "Kids Fun Day", category: "Logo", src: "/graphic-design/Logo/Red And Green Playful Kids Fun Day Facebook Cover (1).jpg", width: 1640, height: 924 },
  { title: "Mt. Moriah", category: "Logo", src: "/graphic-design/Logo/Mt. Moriah (3 x 5).jpg", width: 11520, height: 6912 },
  { title: "Seeds of Life Global", category: "Logo", src: "/graphic-design/Logo/Seeds of Life Global Logo Final.png", width: 2437, height: 1200 },
  { title: "Seeds of Life Global Studies", category: "Logo", src: "/graphic-design/Logo/Seed of Life Global sample logos (1).png", width: 1563, height: 1563 },
  { title: "Praise the Prince of Peace", category: "Logo", src: "/graphic-design/Logo/Praise the Prince of Peace Shirt Design.jpg", width: 1600, height: 1200 },
];

export const videoProjects: VideoProject[] = [
  {
    id: "CTp6p5sYIro",
    title: "International Children's Month - New Life Assembly of God, Sibonga (2024)",
    role: "Video Editor & Videographer",
    href: "https://www.youtube.com/watch?v=CTp6p5sYIro",
  },
  {
    id: "oXNAo5-7hBM",
    title: "International Children's Month - New Life Assembly of God, Sibonga (2023)",
    role: "Video Editor & Videographer",
    href: "https://www.youtube.com/watch?v=oXNAo5-7hBM",
  },
  {
    id: "3RofqJFYTpQ",
    title: "Compassion Visayas Pastors Conference (2024)",
    role: "Video Editor & Videographer",
    href: "https://www.youtube.com/watch?v=3RofqJFYTpQ",
  },
  {
    id: "H-O4ncdYy_8",
    title: "Show Me Your Ways - Action Music Video for Kids",
    role: "Video Editor & Videographer",
    href: "https://www.youtube.com/watch?v=H-O4ncdYy_8",
  },
];

export const creativeArchivePreviews = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    note: "Posters, identity studies, and visual communication.",
    cover: graphicDesignProjects[0].src,
    itemCount: graphicDesignProjects.length,
  },
  {
    id: "video-media",
    title: "Video & Media",
    note: "Selected work as Video Editor & Videographer.",
    cover: `https://i.ytimg.com/vi/${videoProjects[0].id}/hqdefault.jpg`,
    itemCount: videoProjects.length,
  },
] as const;

export const contact = {
  email: "keithjustinemeterio5@gmail.com",
  github: "https://github.com/kthxxx",
  linkedin: "https://www.linkedin.com/in/keith-justin-56262119b/?skipRedirect=true",
  behance: "https://www.behance.net/keithjustin",
  resume: "/Keith_Justin_Emeterio_Final_CV.pdf",
} as const;
