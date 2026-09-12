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

export type Project = { slug: string; name: string; category: string; description: string; stack: string[]; detail?: string; status: string };

export const projects: Project[] = [
  { slug: "resilinav", name: "ResiliNav", category: "Undergraduate Thesis", description: "Flood-resilient navigation routing for Cebu City.", stack: ["Python", "NetworkX", "FastAPI", "React", "Leaflet.js"], detail: "A team thesis that combines rainfall triggers, NOAH flood-depth data, and vehicle-aware routing. Its cost function weighs distance against flood depth and ground clearance across four vehicle types.", status: "In development" },
  { slug: "sentinelai-records", name: "SentinelAI Records", category: "Mobile Application", description: "A focused student records application.", stack: ["React Native", "Expo", "Firebase"], detail: "An iterative mobile build shaped through several interface directions, with Firebase Realtime Database integration and record deletion flows.", status: "Built" },
  { slug: "sentinelai-surveillance", name: "SentinelAI Surveillance", category: "Mobile Application", description: "An AI-powered security surveillance platform concept.", stack: ["React Native", "Expo"], detail: "Includes sign-in, about, upload, and landing experiences, with attention to navigation, animation, and a dark visual system.", status: "Built" },
  { slug: "smart-home-energy-saver", name: "Smart Home Energy Saver", category: "UI/UX Competition", description: "A three-person, four-hour design competition entry.", stack: ["Figma", "UI/UX"], status: "Competition entry" },
  { slug: "react-practice", name: "React Practice Systems", category: "Learning Experiments", description: "Five structured builds for learning practical React patterns.", stack: ["React", "Context", "Reducer"], detail: "Habit tracker, infinite-scroll feed, multi-step form, authentication flow, and a reusable component library.", status: "Learning archive" },
];

export const skillGroups = [
  { index: "01", label: "Development", items: ["React", "React Native", "Python", "FastAPI", "Firebase"] },
  { index: "02", label: "Interface", items: ["Frontend Development", "UI/UX", "Figma", "Responsive Design"] },
  { index: "03", label: "Systems", items: ["NetworkX", "Data", "Computer Architecture", "Formal Languages"] },
  { index: "04", label: "Creative", items: ["Graphic Design", "Photography", "Video Editing", "Content Creation", "Worship Music"] },
] as const;

export const creativeAreas = [
  { index: "001", title: "Graphic Design", note: "Posters, social graphics, and visual communication.", state: "Portfolio assets needed" },
  { index: "002", title: "Photography", note: "Images, observations, and visual stories.", state: "Portfolio assets needed" },
  { index: "003", title: "Video & Media", note: "Editing, content, and moving-image experiments.", state: "Portfolio assets needed" },
  { index: "004", title: "Music", note: "Worship arrangements, chord charts, and key changes.", state: "Practice archive" },
] as const;

export const contact = {
  email: "keithjustinemeterio5@gmail.com",
  github: "https://github.com/kthxxx",
  linkedin: "https://www.linkedin.com/in/keith-justin-56262119b/?skipRedirect=true",
  behance: "https://www.behance.net/keithjustin",
  resume: "/Keith_Justin_Emeterio_Final_CV.pdf",
} as const;
