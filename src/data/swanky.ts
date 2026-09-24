export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string | null;
  alt: string;
  colors: [string, string, string];
  background: string;
  motif: string;
  imageNeeded: string;
}
export interface Testimonial {
  quote: string;
  attribution: string;
}
export const brand = {
  name: "Swanky Balloon Co.",
  area: "Nashville, Brentwood + Middle Tennessee",
  instagram: "https://www.instagram.com/swankyballoonco/",
  website: "https://swankyballoon.com",
  description:
    "Custom balloon installations, garlands, helium arrangements and event styling in Nashville, Brentwood and Middle Tennessee.",
  contact: { email: null, phone: null },
  founderImage: null as string | null,
};
export const navigation = [
  { label: "Work", href: "/gallery" },
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
];
// Owner-supplied brand boards, September 24, 2026. Board 11 supplies this menu.
export const services = [
  {
    number: "01",
    title: "Custom Installations",
    description:
      "Arches, walls and balloon clouds designed for your space. A focal point for the occasion, in a palette that feels like you.",
    color: "blue",
    tag: "MADE FOR YOUR SPACE",
  },
  {
    number: "02",
    title: "Garlands + Backdrops",
    description:
      "Custom balloon garlands for backdrops, easels, marquee lights and step-and-repeat displays.",
    color: "sage",
    tag: "SET THE SCENE",
  },
  {
    number: "03",
    title: "Helium Arrangements",
    description:
      "Oversized helium balloons and bundles for the moments that call for something simple and special.",
    color: "linen",
    tag: "A LITTLE LIFT",
  },
  {
    number: "04",
    title: "Pick Up + Celebrate",
    description:
      "Five- and ten-foot garlands, freestanding garlands and balloon kits. Choose your colors and share your plans.",
    color: "clay",
    tag: "YOUR CELEBRATION, YOUR WAY",
  },
];
export const balloonMenu = {
  pickup: [
    "5′ garland",
    "10′ garland",
    "Oversized helium",
    "Helium bundles",
    "Freestanding garlands",
    "Balloon kits",
  ],
  delivery: [
    "Balloon arches",
    "Balloon walls",
    "Helium arches",
    "Backdrop installations",
    "Marquee light installations",
    "Step-and-repeat installations",
    "Mailbox clusters",
    "Easel installations",
    "Balloon clouds",
    "Pendant light balloons",
    "Custom balloon garlands",
  ],
  note: "Tell us which pieces you have in mind. We’ll confirm the design, pickup or delivery details, and everything included in your proposal.",
};
// Confirmed by the user as Swanky's own, approved portfolio work.
// Source: owner Drive board 8. Other boards contain third-party inspiration, not portfolio assets.
// Occasion is unverified, so descriptions remain Custom Celebration rather than inventing event types.
export const portfolio: PortfolioItem[] = [
  {
    id: "botanical-greens",
    title: "Botanical Green Installation",
    category: "Botanical Greens",
    image: "/swanky/portfolio/botanical-green-installation.webp",
    alt: "Swanky freestanding balloon installation in sage, olive and deep green with trailing greenery beside a venue column",
    colors: ["#a7b5a0", "#617563", "#eae6d9"],
    background: "#e3e7df",
    motif: "",
    imageNeeded: "",
  },
  {
    id: "pink-ivory",
    title: "Pink + Ivory Freestanding Garland",
    category: "Pink + Ivory",
    image: "/swanky/portfolio/pink-ivory-freestanding.webp",
    alt: "Swanky pink and ivory freestanding balloon garland with delicate white flowers beside a wooden barn door",
    colors: ["#d6abb1", "#f2eee5", "#b4a18d"],
    background: "#eee0dc",
    motif: "",
    imageNeeded: "",
  },
  {
    id: "pink-lilac",
    title: "Pink + Lilac Balloon Pillars",
    category: "Pink + Lilac",
    image: "/swanky/portfolio/pink-lilac-pillars.webp",
    alt: "Two Swanky freestanding balloon pillars in pink and lilac framing an indoor venue entrance",
    colors: ["#d6abb1", "#bcb4cd", "#cf8baf"],
    background: "#e8e2ec",
    motif: "",
    imageNeeded: "",
  },
];
export const categories = [
  "All",
  "Botanical Greens",
  "Pink + Ivory",
  "Pink + Lilac",
];
// SAMPLE COPY: all occasion categories and vibe labels require owner confirmation.
export const eventTypes = [
  "Birthday",
  "Shower",
  "Wedding",
  "Brand event",
  "Grand opening",
  "Milestone",
  "Just because",
  "Other",
];
// Qualification ranges only. These are not service prices or minimums.
export const budgetRanges = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000+",
  "I’m not sure yet",
];
// Interpreted from the owner's mood boards. No numerical color specifications were supplied.
export const brandColors = {
  ink: "#39332e",
  ivory: "#f7f4ed",
  blue: "#8c9aa8",
  blueDeep: "#4f6372",
  sage: "#a7b5a0",
  taupe: "#b4a18d",
  chocolate: "#59473e",
};
export const swatches = [
  { name: "Ivory", hex: "#f2eee5" },
  { name: "Dusty blue", hex: "#8c9aa8" },
  { name: "Sage", hex: "#a7b5a0" },
  { name: "Taupe", hex: "#b4a18d" },
  { name: "Chocolate", hex: "#59473e" },
  { name: "Blush", hex: "#d6abb1" },
  { name: "Lilac", hex: "#bcb4cd" },
  { name: "Olive", hex: "#617563" },
  { name: "Champagne", hex: "#d2c5a6" },
  { name: "Bordeaux", hex: "#764650" },
  { name: "Rose", hex: "#cf8baf" },
  { name: "Ink", hex: "#39332e" },
];
export const vibes = [
  { name: "Signature Swanky", colors: ["#f2eee5", "#8c9aa8", "#a7b5a0"] },
  { name: "Soft Bloom", colors: ["#d6abb1", "#f2eee5", "#bcb4cd"] },
  { name: "Natural Neutrals", colors: ["#f2eee5", "#b4a18d", "#59473e"] },
  { name: "Garden Gathering", colors: ["#a7b5a0", "#617563", "#f2eee5"] },
  { name: "A Little Romance", colors: ["#764650", "#d6abb1", "#d2c5a6"] },
  { name: "Build My Own", colors: ["#8c9aa8", "#d6abb1", "#bcb4cd"] },
];
export const processSteps = [
  {
    title: "Share the occasion",
    description:
      "Share the date, location, occasion, inspiration and approximate budget.",
  },
  {
    title: "Find the direction",
    description:
      "Swanky reviews the details and develops the recommended direction.",
  },
  {
    title: "Confirm the details",
    description:
      "Confirm the scope and complete the steps required to reserve the event.",
  },
  {
    title: "Enjoy the celebration",
    description:
      "The final design is prepared for your event and brought to life.",
  },
];
export const faqs = [
  {
    question: "Can I pick up my balloons?",
    answer:
      "The balloon menu includes pickup options such as five- and ten-foot garlands, oversized helium balloons, helium bundles, freestanding garlands and balloon kits. Let us know what you have in mind so pickup details can be confirmed.",
  },
  {
    question: "Where does Swanky Balloon Co. serve?",
    answer:
      "Swanky serves Nashville, Brentwood and communities throughout Middle Tennessee. Share your venue in the inquiry so travel and setup details can be confirmed.",
  },
  {
    question: "How quickly will I hear back?",
    answer:
      "Most inquiries receive a response within approximately 24–48 hours. Event weekends and holidays may affect response times.",
  },
  {
    question: "What should I include in my inquiry?",
    answer:
      "Include the event date, location, occasion, theme, preferred colors, inspiration and estimated budget. The more context you provide, the easier it is to recommend the right direction.",
  },
  {
    question: "Can I submit inspiration photos?",
    answer:
      "Yes. Share an inspiration link in your inquiry. You can also preview a file in this concept; files are not uploaded or sent yet.",
  },
  {
    question: "Are delivery, setup and removal included?",
    answer:
      "Options may vary by project. The final proposal should clearly explain the services included for that event.",
  },
  {
    question: "How do I reserve my event?",
    answer:
      "After the project details are reviewed, Swanky will provide the next steps required to approve and reserve the event.",
  },
];
export const testimonials: Testimonial[] = [];
export const copy = {
  cta: "Plan Your Celebration",
  announcement:
    "Custom balloons + thoughtful celebrations · Nashville, Brentwood & Middle Tennessee",
  hero: {
    eyebrow: "SWANKY BALLOON CO. / NASHVILLE, TN",
    title: "A little wonder. A lasting impression.",
    lines: ["A little wonder.", "A lasting", "impression."],
    description:
      "Balloon garlands, helium arrangements and custom installations, designed around your colors, your space and your occasion.",
  },
  statement: {
    title: "The details make it yours.",
    description:
      "A favorite shade. A beautiful setting. A reason to gather. We bring those details together in balloon designs that feel at home in your celebration.",
  },
  services: {
    eyebrow: "THE BALLOON COLLECTION",
    title: "A thoughtful touch. A beautiful celebration.",
    description:
      "From a bundle to bring along to an installation that fills the room.",
  },
  palette: {
    eyebrow: "THE COLOR STUDIO",
    title: "Every celebration begins with a palette.",
    description:
      "Start with a favorite combination, then make it your own. We’ll use it as the first page of your event’s design story.",
  },
  gallery: {
    eyebrow: "A FEW SWANKY MOMENTS",
    title: "Made for the occasion.",
    description:
      "Real installations, personal palettes, and all the details in between.",
  },
  about: {
    title: "A thoughtful eye. A personal touch.",
    description:
      "Swanky Balloon Co. creates custom balloon art and event styling across Nashville, Brentwood and Middle Tennessee. We begin with your occasion, your palette and your space, then shape a design around the details that matter to you.",
  },
  benefits: [
    "The important details, gathered in one thoughtful inquiry",
    "A design direction shaped by your palette, venue and occasion",
    "Clear next steps from the first conversation through event day",
  ],
  closing: {
    title: "Something lovely starts here.",
    description:
      "Tell us about the occasion, the setting and the colors you love. We’ll help you find the right place to begin.",
  },
  confirmation:
    "Thank you for sharing your plans. Swanky will review your event and follow up within approximately 24–48 hours.",
  planner: {
    eyebrow: "TELL US WHAT YOU’RE PLANNING",
    title: "Your occasion. Beautifully considered.",
    description: "A few details to begin. Room for your ideas to grow.",
  },
};
export const pipelineStages = [
  "New Inquiry",
  "Needs Date Check",
  "Qualified",
  "Consultation Scheduled",
  "Proposal Sent",
  "Awaiting Deposit",
  "Booked",
  "Design Approval",
  "Production",
  "Event Scheduled",
  "Completed",
  "Review Requested",
];
export interface MockLead {
  id: number;
  type: string;
  city: string;
  date: string;
  budget: string;
  colors: string[];
  stage: string;
}
export const mockLeads: MockLead[] = [
  {
    id: 1048,
    type: "Birthday",
    city: "Nashville",
    date: "Oct 18",
    budget: "$1,000–$2,500",
    colors: vibes[0].colors,
    stage: "New Inquiry",
  },
  {
    id: 1049,
    type: "Shower",
    city: "Brentwood",
    date: "Oct 24",
    budget: "$500–$1,000",
    colors: vibes[1].colors,
    stage: "New Inquiry",
  },
  {
    id: 1044,
    type: "Brand event",
    city: "Nashville",
    date: "Oct 20",
    budget: "$2,500–$5,000",
    colors: vibes[3].colors,
    stage: "Qualified",
  },
  {
    id: 1041,
    type: "Milestone",
    city: "Brentwood",
    date: "Oct 25",
    budget: "$1,000–$2,500",
    colors: vibes[2].colors,
    stage: "Proposal Sent",
  },
  {
    id: 1038,
    type: "Birthday",
    city: "Nashville",
    date: "Oct 17",
    budget: "$1,000–$2,500",
    colors: vibes[0].colors,
    stage: "Booked",
  },
  {
    id: 1035,
    type: "Brand event",
    city: "Nashville",
    date: "Oct 16",
    budget: "$2,500–$5,000",
    colors: vibes[3].colors,
    stage: "Production",
  },
  {
    id: 1030,
    type: "Shower",
    city: "Brentwood",
    date: "Oct 10",
    budget: "$500–$1,000",
    colors: vibes[1].colors,
    stage: "Completed",
  },
];
