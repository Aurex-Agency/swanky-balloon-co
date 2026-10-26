import { brand } from "@/data/swanky";

/** The business's contact details, as both legal pages list them. */
export function LegalContact() {
  return (
    <address className="legal-contact">
      <strong>{brand.legalName}</strong>
      <span>{brand.address}</span>
      <a href={`mailto:${brand.contact.email}`}>{brand.contact.email}</a>
      <a href={brand.contact.phoneHref}>{brand.contact.phone}</a>
    </address>
  );
}
