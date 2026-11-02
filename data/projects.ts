// Nambah project = nambah satu object di array ini (urutan = urutan tampil).
export type Project = {
  slug: string; title: string; category: string; year: string;
  tags: string[]; platform: string; link: string;
  cover: string;            // "" = tampil blok warna tema
  bg: string; fg: string;   // warna tema halaman project
  description: string;
  gallery: string[];
  demo?: "neo";
};
const img = (p: string) => `/images/projects/${p}.webp`;
export const projects: Project[] = [
  { slug: "common-ground", title: "Common Ground", category: "Fight & Boxing Event Platform", year: "2026", tags: ["Next.js", "Tailwind CSS", "REST API"], platform: "Web", link: "https://commongroundproject.id/", cover: img("common-ground/01"), bg: "#240303", fg: "#ffeceb", description: "A full event management platform: organizer dashboard, match schedule, fighter registration, ticketing and the payment flow behind it.", gallery: [1, 2, 3, 4].map((n) => img(`common-ground/0${n}`)) },
  { slug: "levi-camp", title: "Levi Camp", category: "Camp Reservation Platform", year: "2025", tags: ["Next.js", "REST API"], platform: "Web", link: "https://levicamp-frontend-heulau-labs-projects.vercel.app/", cover: img("levi-camp/01"), bg: "#d1e2ff", fg: "#14274e", description: "An interactive reservation flow with live availability, calendar and time-slot selection, so booking a tent takes a few taps.", gallery: [1, 2].map((n) => img(`levi-camp/0${n}`)) },
  { slug: "neo-indo-elektrik", title: "Neo Indo Elektrik", category: "Operational Management System", year: "2025", tags: ["Laravel", "Blade", "MySQL"], platform: "Web · private", link: "", cover: "", bg: "#0b2a20", fg: "#dcfce7", description: "An internal system for work orders, purchase orders and stock, with multi-stage document approval and live monitoring dashboards.", gallery: [], demo: "neo" },
  { slug: "naresh-natajaya", title: "Naresh Natajaya", category: "Corporate Website", year: "2026", tags: ["WordPress"], platform: "Web", link: "https://nareshnata-jaya.com/", cover: "", bg: "#240a0a", fg: "#ffe4e0", description: "A company website for a fire suppression and industrial gas piping provider: product catalog, services, certifications and a quotation flow.", gallery: [] },
  { slug: "sympathy-for-dandelions", title: "Sympathy For Dandelions", category: "Brand Catalog & Store", year: "2024", tags: ["Laravel", "MySQL"], platform: "Web · archived", link: "https://github.com/belzubeb/sfd", cover: img("sfd/01"), bg: "#eeece7", fg: "#111114", description: "A full-stack brand catalog with authentication middleware, MVC architecture and Eloquent ORM. Source only, not deployed.", gallery: [1, 2].map((n) => img(`sfd/0${n}`)) },
  { slug: "muvmuv", title: "Muvmuv", category: "Movie Community App", year: "2024", tags: ["Android (Java)", "Firebase"], platform: "Android · archived", link: "https://github.com/belzubeb/Muvmuv", cover: img("muvmuv/cover"), bg: "#2a0f0a", fg: "#ffe7e1", description: "An Android community app for movie reviews and discussions, with social-style features synced in real time through Firebase.", gallery: [img("muvmuv/cover")] },
];
