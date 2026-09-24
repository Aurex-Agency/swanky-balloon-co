import { z } from "zod";
import {
  eventTypes,
  budgetRanges,
  services,
  vibes,
  swatches,
} from "@/data/swanky";
export function todayInNashville() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
const short = z
  .string()
  .trim()
  .max(200, "Please keep this under 200 characters.");
const choice = (values: string[], message: string) =>
  z.string().refine((value) => values.includes(value), message);
const date = z
  .string()
  .refine(
    (value) =>
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      !Number.isNaN(Date.parse(value)) &&
      new Date(value).toISOString().slice(0, 10) === value,
    "Choose a valid event date.",
  )
  .refine(
    (value) => value >= todayInNashville(),
    "Please choose today or a future date.",
  );
export const inquirySchema = z.object({
  eventType: choice(eventTypes, "Choose an event type."),
  eventDate: date,
  eventTime: z
    .string()
    .regex(/^$|^([01]\d|2[0-3]):[0-5]\d$/, "Choose a valid time."),
  guestCount: z
    .string()
    .refine(
      (v) => v === "" || (/^\d{1,6}$/.test(v) && Number(v) > 0),
      "Enter a positive number of guests.",
    ),
  venueName: short,
  venueCity: short.min(2, "Tell us the venue city."),
  environment: choice(
    ["Indoor", "Outdoor", "Unsure"],
    "Choose indoor, outdoor or unsure.",
  ),
  theme: z.string().trim().max(1000),
  vibe: choice(
    vibes.map((v) => v.name),
    "Choose a vibe.",
  ),
  colors: z
    .array(
      choice(
        swatches.map((s) => s.hex),
        "Choose a listed color.",
      ),
    )
    .max(3)
    .refine((v) => new Set(v).size === v.length, "Choose different colors."),
  serviceInterests: z
    .array(
      choice(
        services.map((s) => s.title),
        "Choose a listed service.",
      ),
    )
    .min(1, "Select at least one service.")
    .max(4),
  inspirationLink: z
    .string()
    .trim()
    .max(2000)
    .refine(
      (v) =>
        v === "" || (/^https?:\/\//.test(v) && z.url().safeParse(v).success),
      "Use a full http:// or https:// link.",
    ),
  notes: z.string().trim().max(3000),
  budgetRange: choice(
    budgetRanges,
    "Choose a budget range or “I’m not sure yet.”",
  ),
  firstName: short.min(1, "Enter your first name."),
  lastName: short.min(1, "Enter your last name."),
  email: z.email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s.-]+$/, "Enter a valid phone number.")
    .refine((v) => {
      const n = v.replace(/\D/g, "").length;
      return n >= 7 && n <= 15;
    }, "Enter a valid phone number."),
  preferredContact: choice(
    ["Email", "Phone call", "Text message"],
    "Choose a contact method.",
  ),
  leadSource: short,
  consent: z.literal(true, {
    error: "Please agree so we can respond to your inquiry.",
  }),
  attribution: z.object({
    utmSource: short,
    utmMedium: short,
    utmCampaign: short,
    utmContent: short,
    utmTerm: short,
    referrer: z.string().max(2000),
    landingPage: z.string().max(2000),
  }),
});
export type InquiryForm = z.input<typeof inquirySchema>;
export type Draft = Omit<InquiryForm, "consent"> & { consent: boolean };
export const blankAttribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  referrer: "",
  landingPage: "",
};
export const emptyDraft: Draft = {
  eventType: "",
  eventDate: "",
  eventTime: "",
  guestCount: "",
  venueName: "",
  venueCity: "",
  environment: "Unsure",
  theme: "",
  vibe: vibes[0].name,
  colors: vibes[0].colors,
  serviceInterests: [],
  inspirationLink: "",
  notes: "",
  budgetRange: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  preferredContact: "Email",
  leadSource: "",
  consent: false,
  attribution: blankAttribution,
};
export const stepFields: (keyof Draft)[][] = [
  [
    "eventType",
    "eventDate",
    "eventTime",
    "guestCount",
    "venueName",
    "venueCity",
    "environment",
  ],
  ["theme", "vibe", "colors", "serviceInterests", "inspirationLink", "notes"],
  ["budgetRange"],
  [
    "firstName",
    "lastName",
    "email",
    "phone",
    "preferredContact",
    "leadSource",
    "consent",
  ],
];
export interface Inquiry {
  id: string;
  submittedAt: string;
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferredContact: string;
  };
  event: {
    type: string;
    date: string;
    time: string;
    guestCount: number | null;
    venueName: string;
    venueCity: string;
    environment: string;
  };
  creative: {
    theme: string;
    vibe: string;
    colors: string[];
    serviceInterests: string[];
    inspirationLink: string;
    notes: string;
  };
  qualification: { budgetRange: string; leadSource: string };
  attribution: Draft["attribution"];
  consent: { inquiryResponse: true; marketing: false };
}
export function normalizeInquiry(
  data: z.output<typeof inquirySchema>,
): Inquiry {
  return {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    contact: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      phone: data.phone,
      preferredContact: data.preferredContact,
    },
    event: {
      type: data.eventType,
      date: data.eventDate,
      time: data.eventTime,
      guestCount: data.guestCount ? Number(data.guestCount) : null,
      venueName: data.venueName,
      venueCity: data.venueCity,
      environment: data.environment,
    },
    creative: {
      theme: data.theme,
      vibe: data.vibe,
      colors: data.colors,
      serviceInterests: data.serviceInterests,
      inspirationLink: data.inspirationLink,
      notes: data.notes,
    },
    qualification: {
      budgetRange: data.budgetRange,
      leadSource: data.leadSource,
    },
    attribution: data.attribution,
    consent: { inquiryResponse: true, marketing: false },
  };
}
