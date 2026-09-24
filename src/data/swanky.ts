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
    "Custom balloon art, backdrops, props and event styling for celebrations across Nashville, Brentwood and Middle Tennessee.",
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
export const services = [
  {
    number: "01",
    title: "Custom Balloon Art",
    description:
      "Statement-making balloon designs shaped around the event, palette and space.",
    color: "pink",
    tag: "A LITTLE EXTRA? ALWAYS.",
  },
  {
    number: "02",
    title: "Backdrops + Props",
    description:
      "Layered photo moments designed to make the theme feel complete.",
    color: "lavender",
    tag: "SET THE SCENE.",
  },
  // SAMPLE COPY: confirm final service scope with owner.
  {
    number: "03",
    title: "Celebration Styling",
    description:
      "A cohesive visual direction for birthdays, showers, milestones and special occasions.",
    color: "lime",
    tag: "IT’S ALL IN THE DETAILS.",
  },
  // SAMPLE COPY: confirm final service scope with owner.
  {
    number: "04",
    title: "Brand + Corporate Moments",
    description:
      "Branded installations and camera-ready event features for launches, openings and company celebrations.",
    color: "aqua",
    tag: "BIG IDEAS. BIG IMPACT.",
  },
];
// SAMPLE CONCEPTS: these are editorial image slots, not completed Swanky projects.
// Replace image, alt and category here when approved photography is provided.
export const portfolio: PortfolioItem[] = [
  {
    id: "color-party",
    title: "Color-Forward Birthday Installation",
    category: "Birthdays",
    image: null,
    alt: "",
    colors: ["#ef2aa8", "#aaa7f7", "#e7ef2d"],
    background: "#d9d6f3",
    motif: "MAKE IT\nA MOMENT.",
    imageNeeded: "Full-height colorful birthday installation",
  },
  {
    id: "soft-bloom",
    title: "Soft Pastel Shower Backdrop",
    category: "Showers",
    image: null,
    alt: "",
    colors: ["#f7b5dc", "#fff8ef", "#9ee4df"],
    background: "#f3cddc",
    motif: "oh,\nbaby.",
    imageNeeded: "Pastel shower backdrop, portrait crop",
  },
  {
    id: "brand-moment",
    title: "Branded Event Moment",
    category: "Corporate",
    image: null,
    alt: "",
    colors: ["#e7ef2d", "#aaa7f7", "#ef2aa8"],
    background: "#e7ef2d",
    motif: "BIG\nENERGY.",
    imageNeeded: "Approved branded event installation",
  },
  {
    id: "neutral",
    title: "Modern Neutral Celebration",
    category: "Weddings",
    image: null,
    alt: "",
    colors: ["#fff8ef", "#c8af92", "#decfc2"],
    background: "#ddcdbc",
    motif: "all\nlove.",
    imageNeeded: "Neutral celebration or verified wedding installation",
  },
  {
    id: "disco",
    title: "Disco-Inspired Photo Wall",
    category: "Birthdays",
    image: null,
    alt: "",
    colors: ["#ef2aa8", "#aaa7f7", "#ff786c"],
    background: "#a5a0ef",
    motif: "LET’S\nDANCE.",
    imageNeeded: "Disco-inspired balloon photo wall",
  },
  {
    id: "outdoor",
    title: "Outdoor Milestone Installation",
    category: "Seasonal",
    image: null,
    alt: "",
    colors: ["#9ee4df", "#e7ef2d", "#fff8ef"],
    background: "#aad9cc",
    motif: "good\ntimes.",
    imageNeeded: "Outdoor installation showing venue and scale",
  },
];
export const categories = [
  "All",
  "Birthdays",
  "Showers",
  "Weddings",
  "Corporate",
  "Seasonal",
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
export const swatches = [
  { name: "Hot pink", hex: "#ef2aa8" },
  { name: "Petal", hex: "#f7b5dc" },
  { name: "Lavender", hex: "#aaa7f7" },
  { name: "Lime", hex: "#e7ef2d" },
  { name: "Aqua", hex: "#9ee4df" },
  { name: "Coral", hex: "#ff786c" },
  { name: "Cream", hex: "#fff8ef" },
  { name: "Sand", hex: "#c8af92" },
  { name: "Sky", hex: "#76b9ef" },
  { name: "Cobalt", hex: "#3652c9" },
  { name: "Cherry", hex: "#bd294b" },
  { name: "Ink", hex: "#181517" },
];
export const vibes = [
  { name: "Disco Pop", colors: ["#ef2aa8", "#aaa7f7", "#e7ef2d"] },
  { name: "Soft Bloom", colors: ["#f7b5dc", "#fff8ef", "#9ee4df"] },
  { name: "Modern Neutral", colors: ["#fff8ef", "#c8af92", "#181517"] },
  { name: "Electric Color", colors: ["#ef2aa8", "#e7ef2d", "#3652c9"] },
  { name: "Team Spirit", colors: ["#3652c9", "#fff8ef", "#bd294b"] },
  { name: "Build My Own", colors: ["#ff786c", "#9ee4df", "#aaa7f7"] },
];
export const processSteps = [
  {
    title: "Tell Us About It",
    description:
      "Share the date, location, occasion, inspiration and approximate budget.",
  },
  {
    title: "Shape the Vision",
    description:
      "Swanky reviews the details and develops the recommended direction.",
  },
  {
    title: "Approve the Plan",
    description:
      "Confirm the scope and complete the steps required to reserve the event.",
  },
  {
    title: "Make It Swanky",
    description:
      "The final design is prepared for your event and brought to life.",
  },
];
export const faqs = [
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
  announcement:
    "Now creating unforgettable moments across Nashville, Brentwood + Middle Tennessee.",
  hero: {
    eyebrow: "CUSTOM BALLOONS + EVENT STYLING · NASHVILLE",
    title: "Make the moment impossible to miss.",
    description:
      "Custom balloon art, backdrops and playful event styling created for celebrations that deserve more than basic.",
  },
  statement: {
    title: "Not your average party backdrop.",
    description:
      "Swanky turns colors, themes and big ideas into custom moments people want to photograph, share and remember.",
  },
  about: {
    title: "Big color. Thoughtful details. Very Swanky.",
    description:
      "Swanky Balloon Co. creates custom balloon art and event styling for celebrations across Nashville, Brentwood and Middle Tennessee. Every event begins with a vision, a palette and the details that make the moment personal.",
  },
  benefits: [
    "A guided inquiry that captures the important details from the beginning",
    "A visual direction built around the event, venue and palette",
    "Clear communication from the first idea through event day",
  ],
  closing: {
    title: "Let’s make it pop.",
    description:
      "Tell us what you’re celebrating, where it’s happening and what you want the room to feel like.",
  },
  confirmation:
    "Thanks for sharing the details. Swanky will review your event and follow up within approximately 24–48 hours.",
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
