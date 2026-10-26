export interface PortfolioItem {
  id: string;
  story: string;
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
  legalName: "Swanky Balloon Co. LLC",
  /** Business address shown in the privacy policy and terms. */
  address: "1723 Ravello Way, Brentwood, TN 37027",
  area: "Nashville, Brentwood + Middle Tennessee",
  instagram: "https://www.instagram.com/swankyballoonco/",
  website: "https://swankyballoon.com",
  description:
    "Custom balloon installations, garlands, helium arrangements and event styling in Nashville, Brentwood and Middle Tennessee.",
  contact: {
    email: "swankyballoonco@gmail.com",
    phone: "(615) 686-5113",
    phoneHref: "tel:+16156865113",
  },
  founderImage: null as string | null,
};
export const navigation = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Pick Up", href: "/pickup" },
  { label: "Palettes", href: "/palettes" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];
// Owner-supplied brand boards, September 24, 2026. Board 11 supplies this menu.
export type ServiceSticker = "swoosh" | "bow" | "balloon" | "balloon-dog";
export interface Service {
  number: string;
  slug: string;
  href: string;
  title: string;
  description: string;
  color: "blush" | "blue" | "gold" | "sand";
  tag: string;
  sticker: ServiceSticker;
  lead: string;
  includes: string[];
  note: string;
}
// Titles are submitted with inquiries and mapped to GoHighLevel; keep them stable.
// "includes" lists come only from the owner's pickup and delivery menu (board 11).
export const services: Service[] = [
  {
    number: "01",
    slug: "custom-installations",
    href: "/services/custom-installations",
    title: "Custom Installations",
    description:
      "Arches, walls and balloon clouds designed for your space. A focal point for the occasion, in a palette that feels like you.",
    color: "blush",
    tag: "MADE FOR YOUR SPACE",
    sticker: "swoosh",
    lead: "The piece everyone gathers around. We design it for your room, your palette and the moment you want to remember.",
    includes: [
      "Balloon arches",
      "Balloon walls",
      "Helium arches",
      "Balloon clouds",
      "Pendant light balloons",
      "Mailbox clusters",
    ],
    note: "Share your venue and a photo of the space if you have one. Size, setup and delivery are confirmed in your proposal.",
  },
  {
    number: "02",
    slug: "garlands-backdrops",
    href: "/services/garlands-backdrops",
    title: "Garlands + Backdrops",
    description:
      "Custom balloon garlands for backdrops, easels, marquee lights and step-and-repeat displays.",
    color: "blue",
    tag: "SET THE SCENE",
    sticker: "bow",
    lead: "Frame the photo wall, the welcome sign or the dessert table with a garland made in your colors.",
    includes: [
      "Custom balloon garlands",
      "Backdrop installations",
      "Marquee light installations",
      "Step-and-repeat installations",
      "Easel installations",
    ],
    note: "We design the balloons around your backdrop, marquee letters or easel. Any rentals are confirmed in your proposal.",
  },
  {
    number: "03",
    slug: "helium-arrangements",
    href: "/services/helium-arrangements",
    title: "Helium Arrangements",
    description:
      "Oversized helium balloons and bundles for the moments that call for something simple and special.",
    color: "gold",
    tag: "A LITTLE LIFT",
    sticker: "balloon",
    lead: "Something simple and special: an oversized balloon for the guest of honor or a bundle that makes an entrance.",
    includes: ["Oversized helium balloons", "Helium bundles"],
    note: "Tell us the colors and the occasion. Pickup or delivery is confirmed when we follow up.",
  },
  {
    number: "04",
    slug: "pick-up",
    href: "/pickup",
    title: "Pick Up + Celebrate",
    description:
      "Five- and ten-foot garlands, freestanding garlands and balloon kits. Choose your colors and share your plans.",
    color: "sand",
    tag: "YOUR CELEBRATION, YOUR WAY",
    sticker: "balloon-dog",
    lead: "Choose your colors, pick it up and make the party yours.",
    includes: [
      "5′ garland",
      "10′ garland",
      "Oversized helium",
      "Helium bundles",
      "Freestanding garlands",
      "Balloon kits",
    ],
    note: "Pickup timing and location are confirmed when we follow up on your request.",
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
    story:
      "A freestanding installation in sage, olive and deep green, finished with trailing greenery beside a venue column.",
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
    story:
      "A freestanding garland in soft pink and ivory, tucked with delicate white flowers beside a wooden barn door.",
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
    story:
      "A pair of freestanding balloon pillars in pink and lilac, framing an indoor venue entrance.",
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
// Brand values from Jenn's expanded brand guide (Canva p.5). The swatches add balloon
// colors clients often ask for beyond the brand palette.
export const brandColors = {
  ivory: "#F7F0E6",
  olive: "#565522",
  gold: "#C7AD50",
  blue: "#A8BDCB",
  blush: "#E8C3BA",
  sand: "#C9B79F",
  charcoal: "#252524",
};
export const swatches = [
  { name: "Ivory", hex: "#F7F0E6" },
  { name: "Blush", hex: "#E8C3BA" },
  { name: "Dusty blue", hex: "#A8BDCB" },
  { name: "Golden", hex: "#C7AD50" },
  { name: "Sand", hex: "#C9B79F" },
  { name: "Olive", hex: "#565522" },
  { name: "Sage", hex: "#A7B5A0" },
  { name: "Lilac", hex: "#BCB4CD" },
  { name: "Rose", hex: "#CF8BAF" },
  { name: "Bordeaux", hex: "#764650" },
  { name: "Chocolate", hex: "#59473E" },
  { name: "Charcoal", hex: "#252524" },
];
// Dark swatches take an ivory check mark.
export const darkSwatches = ["#565522", "#764650", "#59473E", "#252524"];
// Palette names are placeholders until Jenn approves them.
export const vibes = [
  { name: "Signature Swanky", colors: ["#F7F0E6", "#E8C3BA", "#565522"] },
  { name: "Soft Bloom", colors: ["#E8C3BA", "#F7F0E6", "#C9B79F"] },
  { name: "Blue Hour", colors: ["#A8BDCB", "#F7F0E6", "#C9B79F"] },
  { name: "Garden Party", colors: ["#565522", "#C7AD50", "#F7F0E6"] },
  { name: "Golden Hour", colors: ["#C7AD50", "#C9B79F", "#E8C3BA"] },
  { name: "Build My Own", colors: ["#A8BDCB", "#E8C3BA", "#BCB4CD"] },
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
export const faqTopics = ["Booking", "Design", "Pickup + delivery"] as const;
export const faqs: {
  topic: (typeof faqTopics)[number];
  question: string;
  answer: string;
}[] = [
  {
    topic: "Pickup + delivery",
    question: "Can I pick up my balloons?",
    answer:
      "The balloon menu includes pickup options such as five- and ten-foot garlands, oversized helium balloons, helium bundles, freestanding garlands and balloon kits. Let us know what you have in mind so pickup details can be confirmed.",
  },
  {
    topic: "Pickup + delivery",
    question: "Where does Swanky Balloon Co. serve?",
    answer:
      "Swanky serves Nashville, Brentwood and communities throughout Middle Tennessee. Share your venue in the inquiry so travel and setup details can be confirmed.",
  },
  {
    topic: "Booking",
    question: "How quickly will I hear back?",
    answer:
      "Most inquiries receive a response within approximately 24–48 hours. Event weekends and holidays may affect response times.",
  },
  {
    topic: "Booking",
    question: "What should I include in my inquiry?",
    answer:
      "Include the event date, location, occasion, theme, preferred colors, inspiration and estimated budget. The more context you provide, the easier it is to recommend the right direction.",
  },
  {
    topic: "Design",
    question: "Can I submit inspiration photos?",
    answer:
      "Yes. Share an inspiration link in your inquiry, such as a Pinterest board or an Instagram post. File uploads are coming soon.",
  },
  {
    topic: "Pickup + delivery",
    question: "Are delivery, setup and removal included?",
    answer:
      "Options may vary by project. The final proposal should clearly explain the services included for that event.",
  },
  {
    topic: "Booking",
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
    title: "Life’s a party. Make it Swanky.",
    lines: ["Life’s a party.", "Make it", "Swanky."],
    description:
      "Custom balloons for your kind of celebration. From the first color to the final detail, made for you in Nashville and Middle Tennessee.",
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
      "A soft neutral? A little pink? Something entirely your own? Try a combination and bring your favorite colors along.",
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

// Privacy policy, terms and the text message program registered for A2P 10DLC. The
// disclosure is shown beside the optional SMS checkbox on the inquiry form and saved
// with each opt-in, so a change here needs a new version date.
export const legal = {
  updated: "October 26, 2026",
  smsProgram: "Swanky Balloon Co. Event Updates",
  smsDisclosureVersion: "2026-10-26",
  smsDisclosure:
    "I agree to receive text messages from Swanky Balloon Co. LLC at the mobile number above about my inquiry and booking, including replies, quotes, booking confirmations, reminders and event-day updates. Message frequency varies. Message and data rates may apply. Reply HELP for help or STOP to opt out at any time. Consent is not a condition of purchase.",
};
