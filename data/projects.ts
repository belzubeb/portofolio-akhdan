// Nambah project = nambah satu object di array ini (urutan = urutan tampil).
export type Project = {
  slug: string; title: string; category: string; year: string;
  tags: string[]; platform: string; link: string;
  cover: string;            // "" = tampil blok warna tema
  bg: string; fg: string;   // warna tema halaman project
  description: string;
  gallery: string[];
  device?: "browser" | "phone"; // cara galeri ditampilkan (default: browser)
  demo?: "neo";
};
const img = (p: string) => `/images/projects/${p}.webp`;
export const projects: Project[] = [
  { slug: "common-ground", title: "Common Ground", category: "Fight & Boxing Event Platform", year: "2026", tags: ["Next.js", "Tailwind CSS", "REST API"], platform: "Web", link: "https://commongroundproject.id/", cover: img("common-ground/cover"), bg: "#240303", fg: "#ffeceb", description: "A full event management platform: organizer dashboard, match schedule, fighter registration, ticketing and the payment flow behind it.", gallery: [img("common-ground/01"), img("common-ground/02"), img("common-ground/03"), img("common-ground/04")] },
  { slug: "levi-camp", title: "Levi Camp", category: "Camp Reservation Platform", year: "2025", tags: ["Next.js", "REST API"], platform: "Web", link: "https://levicamp-frontend-heulau-labs-projects.vercel.app/", cover: img("levi-camp/cover"), bg: "#0c0a09", fg: "#fcc9b5", description: "An interactive reservation flow with live availability, calendar and time-slot selection, so booking a tent takes a few taps.", gallery: [img("levi-camp/01"), img("levi-camp/02"), img("levi-camp/03"), img("levi-camp/04")] },
  { slug: "neo-indo-elektrik", title: "Neo Indo Elektrik", category: "Operational Management System", year: "2025", tags: ["Laravel", "Blade", "MySQL"], platform: "Web · private", link: "", cover: img("neo-indo-elektrik/cover"), bg: "#0b2a20", fg: "#dcfce7", description: "An internal system for work orders, purchase orders and stock, with multi-stage document approval and live monitoring dashboards.", gallery: [img("neo-indo-elektrik/01"), img("neo-indo-elektrik/02")], demo: "neo" },
  { slug: "naresh-natajaya", title: "Naresh Natajaya", category: "Corporate Website", year: "2026", tags: ["WordPress"], platform: "Web", link: "https://nareshnata-jaya.com/", cover: img("naresh-natajaya/cover"), bg: "#240a0a", fg: "#ffe4e0", description: "A company website for a fire suppression and industrial gas piping provider: product catalog, services, certifications and a quotation flow.", gallery: [img("naresh-natajaya/01"), img("naresh-natajaya/02"), img("naresh-natajaya/03")] },
  { slug: "sympathy-for-dandelions", title: "Sympathy For Dandelions", category: "Brand Catalog & Store", year: "2024", tags: ["Laravel", "MySQL"], platform: "Web · archived", link: "https://github.com/belzubeb/sfd", cover: img("sympathy-for-dandelions/cover"), bg: "#ffe500", fg: "#151515", description: "A full-stack brand catalog with authentication middleware, MVC architecture and Eloquent ORM. Source only, not deployed.", gallery: [img("sympathy-for-dandelions/01"), img("sympathy-for-dandelions/02"), img("sympathy-for-dandelions/03"), img("sympathy-for-dandelions/04"), img("sympathy-for-dandelions/05")], device: "phone" },
  { slug: "muvmuv", title: "Muvmuv", category: "Movie Community App", year: "2024", tags: ["Android (Java)", "Firebase"], platform: "Android · archived", link: "https://github.com/belzubeb/Muvmuv", cover: img("muvmuv/cover"), bg: "#ff4d2d", fg: "#ffffff", description: "An Android community app for movie reviews and discussions, with social-style features synced in real time through Firebase.", gallery: [img("muvmuv/01"), img("muvmuv/02"), img("muvmuv/03"), img("muvmuv/04"), img("muvmuv/05"), img("muvmuv/06")], device: "phone" },
];