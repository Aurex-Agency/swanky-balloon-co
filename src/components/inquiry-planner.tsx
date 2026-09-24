"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Upload,
  ArrowUpRight,
} from "lucide-react";
import {
  copy,
  eventTypes,
  budgetRanges,
  services,
  vibes,
  swatches,
} from "@/data/swanky";
import {
  emptyDraft,
  inquirySchema,
  stepFields,
  todayInNashville,
  type Draft,
} from "@/lib/inquiry";
import { BalloonCluster } from "./balloons";
import { PalettePicker } from "./palette-lab";
const titles = ["The Event", "The Vision", "The Investment", "Your Details"];
const subtitles = [
  "First, the occasion.",
  "The colors. The details. The feeling.",
  "A comfortable place to begin.",
  "A few details, then we’ll be in touch.",
];
const storageKey = "swanky-inquiry-v2";
export function InquiryPlanner() {
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [ready, setReady] = useState(false);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState("");
  const [saved, setSaved] = useState(true);
  const heading = useRef<HTMLHeadingElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const reduced = useReducedMotion();
  useEffect(() => {
    let initial = { ...emptyDraft };
    let initialStep = 0;
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (stored && Date.now() - stored.savedAt < 7 * 86400000) {
        initial = { ...initial, ...stored.draft };
        initialStep = Math.min(3, Math.max(0, stored.step || 0));
      }
      const attribution = JSON.parse(
        sessionStorage.getItem("swanky-attribution") || "null",
      );
      if (attribution) initial.attribution = attribution;
    } catch {
      /* Empty draft works when storage is blocked. */
    }
    const params = new URLSearchParams(window.location.search);
    const vibe = vibes.find((v) => v.name === params.get("vibe"));
    if (vibe) initial.vibe = vibe.name;
    if (params.has("colors"))
      initial.colors = [
        ...new Set(
          (params.get("colors") || "")
            .split(",")
            .filter((c) => swatches.some((s) => s.hex === c)),
        ),
      ].slice(0, 3);
    if (eventTypes.includes(params.get("event") || ""))
      initial.eventType = params.get("event")!;
    if (services.some((s) => s.title === params.get("service")))
      initial.serviceInterests = [params.get("service")!];
    queueMicrotask(() => {
      setDraft(initial);
      setStep(initialStep);
      setReady(true);
    });
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ draft, step, savedAt: Date.now() }),
      );
    } catch {
      queueMicrotask(() => setSaved(false));
    }
  }, [draft, step, ready]);
  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
    setError("");
  }
  function validate(all = false) {
    const result = inquirySchema.safeParse(draft);
    const next: Record<string, string> = {};
    if (!result.success)
      for (const issue of result.error.issues) {
        const name = String(issue.path[0]);
        if (all || stepFields[step].includes(name as keyof Draft))
          next[name] = issue.message;
      }
    setErrors(next);
    if (Object.keys(next).length) {
      if (all) {
        const first = stepFields.findIndex((fields) =>
          fields.some((f) => next[f]),
        );
        if (first >= 0) setStep(first);
      }
      requestAnimationFrame(() => errorSummary.current?.focus());
      return false;
    }
    return true;
  }
  function changeStep(next: number) {
    setErrors({});
    setError("");
    setStep(next);
    setTimeout(() => heading.current?.focus(), 100);
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (!validate(step === 3)) return;
    if (step < 3) {
      changeStep(step + 1);
      return;
    }
    setSending(true);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.fields || {});
        throw new Error(
          result.error || "Something went wrong. Please try again.",
        );
      }
      try {
        sessionStorage.setItem(
          "swanky-confirmation",
          JSON.stringify({
            eventType: draft.eventType,
            eventDate: draft.eventDate,
            venueCity: draft.venueCity,
            vibe: draft.vibe,
            colors: draft.colors,
            demo: result.demo,
          }),
        );
        localStorage.removeItem(storageKey);
      } catch {
        /* A confirmed submission still succeeds without storage. */
      }
      router.push(`/thank-you${result.demo ? "?demo=true" : ""}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again shortly.");
      setSending(false);
      requestAnimationFrame(() => errorSummary.current?.focus());
    }
  }
  function field(
    name: keyof Draft,
    label: string,
    type = "text",
    optional = false,
  ) {
    return (
      <div className="form-field">
        <label htmlFor={name}>
          {label}
          {optional && <span> (optional)</span>}
        </label>
        <input
          id={name}
          name={name}
          type={type}
          value={String(draft[name])}
          min={
            type === "date"
              ? todayInNashville()
              : type === "number"
                ? 1
                : undefined
          }
          max={type === "number" ? 999999 : undefined}
          maxLength={type === "text" ? 200 : undefined}
          autoComplete={
            (
              {
                firstName: "given-name",
                lastName: "family-name",
                email: "email",
                phone: "tel",
              } as Record<string, string>
            )[name]
          }
          onChange={(e) => update(name, e.target.value as never)}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        />
        {errors[name] && (
          <span className="field-error" id={`${name}-error`}>
            {errors[name]}
          </span>
        )}
      </div>
    );
  }
  function select(
    name: keyof Draft,
    label: string,
    options: string[],
    empty = true,
  ) {
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        <select
          id={name}
          value={String(draft[name])}
          onChange={(e) => update(name, e.target.value as never)}
          aria-invalid={!!errors[name]}
          aria-describedby={errors[name] ? `${name}-error` : undefined}
        >
          {empty && <option value="">Select an option</option>}
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        {errors[name] && (
          <span className="field-error" id={`${name}-error`}>
            {errors[name]}
          </span>
        )}
      </div>
    );
  }
  return (
    <div className="planner-layout">
      <aside className="planner-aside">
        <span className="eyebrow">{copy.planner.eyebrow}</span>
        <h1>
          Your occasion.
          <br />
          <em>Beautifully</em>
          <br />
          considered.
        </h1>
        <p>{copy.planner.description}</p>
        <div className="planner-board">
          <span className="eyebrow">YOUR CELEBRATION, TAKING SHAPE</span>
          <BalloonCluster colors={draft.colors} />
          <strong>{draft.vibe}</strong>
          <p>
            {draft.eventType || "A celebration in the making"}
            {draft.venueCity ? ` · ${draft.venueCity}` : ""}
          </p>
        </div>
        <p className="planner-help">
          No need to have it all figured out. This is where we start the
          conversation.
        </p>
      </aside>
      <div className="planner-main">
        <ol className="form-progress" aria-label="Inquiry progress">
          {titles.map((title, i) => (
            <li
              key={title}
              className={i === step ? "current" : i < step ? "complete" : ""}
              aria-current={i === step ? "step" : undefined}
            >
              <span>{i < step ? <Check size={14} /> : i + 1}</span>
              <small>{title}</small>
            </li>
          ))}
        </ol>
        <form noValidate onSubmit={submit} className="inquiry-form">
          <div className="form-step-heading">
            <span className="eyebrow">STEP 0{step + 1} OF 04</span>
            <h2 ref={heading} tabIndex={-1}>
              {subtitles[step]}
            </h2>
          </div>
          {(Object.keys(errors).length > 0 || error) && (
            <div
              className="error-summary"
              role="alert"
              tabIndex={-1}
              ref={errorSummary}
            >
              {error || "A few details need your attention."}
              {Object.entries(errors).map(([key, value]) => (
                <p key={key}>{value}</p>
              ))}
            </div>
          )}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={reduced ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? undefined : { opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
            >
              {step === 0 && (
                <>
                  <div className="form-grid">
                    {select(
                      "eventType",
                      "What are we celebrating?",
                      eventTypes,
                    )}
                    {field("eventDate", "Event date", "date")}
                    {field("eventTime", "Approximate start time", "time", true)}
                    {field("guestCount", "Number of guests", "number", true)}
                    {field("venueName", "Venue name", "text", true)}
                    {field("venueCity", "Venue city")}
                    {select(
                      "environment",
                      "Inside or out?",
                      ["Indoor", "Outdoor", "Unsure"],
                      false,
                    )}
                  </div>
                  <p className="form-note">
                    Sharing a date helps us plan. Availability will be confirmed
                    after your inquiry is reviewed.
                  </p>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="form-field">
                    <label htmlFor="theme">
                      Theme or concept <span>(optional)</span>
                    </label>
                    <input
                      id="theme"
                      maxLength={1000}
                      value={draft.theme}
                      onChange={(e) => update("theme", e.target.value)}
                    />
                  </div>
                  <fieldset className="form-palette">
                    <legend>Your preferred style</legend>
                    <PalettePicker
                      value={{ vibe: draft.vibe, colors: draft.colors }}
                      onChange={(v) => {
                        update("vibe", v.vibe);
                        update("colors", v.colors);
                      }}
                    />
                  </fieldset>
                  <fieldset className="service-choices">
                    <legend>What can we help with?</legend>
                    {services.map((s) => (
                      <label key={s.title}>
                        <input
                          type="checkbox"
                          checked={draft.serviceInterests.includes(s.title)}
                          onChange={(e) =>
                            update(
                              "serviceInterests",
                              e.target.checked
                                ? [...draft.serviceInterests, s.title]
                                : draft.serviceInterests.filter(
                                    (v) => v !== s.title,
                                  ),
                            )
                          }
                        />
                        {s.title}
                      </label>
                    ))}
                    {errors.serviceInterests && (
                      <p className="field-error">{errors.serviceInterests}</p>
                    )}
                  </fieldset>
                  {field("inspirationLink", "Inspiration link", "url", true)}
                  <div className="upload-demo">
                    <Upload size={20} />
                    <div>
                      <label htmlFor="inspiration-file">
                        Try an inspiration file <span>(optional)</span>
                      </label>
                      <p>
                        Demo only. This file stays on your device and is not
                        submitted. Use a shareable link above to send
                        inspiration.
                      </p>
                      <input
                        type="file"
                        id="inspiration-file"
                        accept="image/*,.pdf"
                        onChange={(e) =>
                          setFile(e.target.files?.[0]?.name || "")
                        }
                      />
                      {file && (
                        <small aria-live="polite">
                          Selected locally: {file}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="form-field">
                    <label htmlFor="notes">
                      Anything else we should know? <span>(optional)</span>
                    </label>
                    <textarea
                      id="notes"
                      maxLength={3000}
                      value={draft.notes}
                      onChange={(e) => update("notes", e.target.value)}
                    />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <p className="step-description">
                    An approximate budget helps us recommend a direction that
                    feels right for you.
                  </p>
                  <fieldset className="budget-options">
                    <legend className="sr-only">Estimated investment</legend>
                    {budgetRanges.map((range) => (
                      <label
                        key={range}
                        className={
                          draft.budgetRange === range ? "selected" : ""
                        }
                      >
                        <input
                          type="radio"
                          name="budgetRange"
                          value={range}
                          checked={draft.budgetRange === range}
                          onChange={() => update("budgetRange", range)}
                        />
                        <span>{range}</span>
                        {draft.budgetRange === range && <Check size={19} />}
                      </label>
                    ))}
                  </fieldset>
                  {errors.budgetRange && (
                    <p className="field-error">{errors.budgetRange}</p>
                  )}
                  <p className="form-note">
                    These are planning ranges, not a price list. Every proposal
                    is based on the design, space and services for your event.
                  </p>
                </>
              )}
              {step === 3 && (
                <>
                  <div className="form-grid">
                    {field("firstName", "First name")}
                    {field("lastName", "Last name")}
                    {field("email", "Email", "email")}
                    {field("phone", "Mobile phone", "tel")}
                    {select(
                      "preferredContact",
                      "Best way to reach you",
                      ["Email", "Phone call", "Text message"],
                      false,
                    )}
                    {field(
                      "leadSource",
                      "How did you hear about us?",
                      "text",
                      true,
                    )}
                  </div>
                  <div className="inquiry-summary">
                    <span className="eyebrow">
                      YOUR CELEBRATION AT A GLANCE
                    </span>
                    <dl>
                      <div>
                        <dt>The event</dt>
                        <dd>
                          {draft.eventType} · {draft.eventDate}
                        </dd>
                      </div>
                      <div>
                        <dt>The place</dt>
                        <dd>
                          {draft.venueName ? `${draft.venueName}, ` : ""}
                          {draft.venueCity} · {draft.environment}
                        </dd>
                      </div>
                      <div>
                        <dt>The details</dt>
                        <dd>
                          {draft.eventTime || "Time to be confirmed"}
                          {draft.guestCount
                            ? ` · ${draft.guestCount} guests`
                            : ""}
                        </dd>
                      </div>
                      <div>
                        <dt>The vision</dt>
                        <dd>
                          {draft.vibe}
                          {draft.theme ? ` · ${draft.theme}` : ""}
                          <div className="color-dots">
                            {draft.colors.map((c) => (
                              <span
                                key={c}
                                title={swatches.find((s) => s.hex === c)?.name}
                                style={{ background: c }}
                              />
                            ))}
                          </div>
                        </dd>
                      </div>
                      <div>
                        <dt>The services</dt>
                        <dd>{draft.serviceInterests.join(", ")}</dd>
                      </div>
                      <div>
                        <dt>The investment</dt>
                        <dd>{draft.budgetRange}</dd>
                      </div>
                      {draft.inspirationLink && (
                        <div>
                          <dt>Inspiration</dt>
                          <dd>{draft.inspirationLink}</dd>
                        </div>
                      )}
                      {draft.notes && (
                        <div>
                          <dt>Your notes</dt>
                          <dd>{draft.notes}</dd>
                        </div>
                      )}
                    </dl>
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => changeStep(0)}
                    >
                      Edit event details <ArrowUpRight size={14} />
                    </button>
                  </div>
                  <label className="consent">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={draft.consent}
                      onChange={(e) => update("consent", e.target.checked)}
                      aria-invalid={!!errors.consent}
                    />
                    <span>
                      I agree that Swanky Balloon Co. may contact me about this
                      inquiry using my preferred contact method. This is not
                      consent to ongoing marketing.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="field-error">{errors.consent}</p>
                  )}
                  {process.env.NEXT_PUBLIC_DEMO_MODE === "true" && (
                    <p className="form-note">
                      Concept preview. With no live connection configured,
                      submissions demonstrate the flow and are not sent to
                      Swanky.
                    </p>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="form-navigation">
            {step > 0 ? (
              <button
                type="button"
                className="back-button"
                disabled={sending}
                onClick={() => changeStep(step - 1)}
              >
                <ArrowLeft size={17} /> Back
              </button>
            ) : (
              <span />
            )}
            <button
              className="button button-ink"
              type="submit"
              disabled={sending || !ready}
            >
              {sending
                ? "Sending your inquiry…"
                : step === 3
                  ? "Send My Inquiry"
                  : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="save-note">
            {saved
              ? "Progress saves on this device for up to 7 days."
              : "Your browser cannot save progress. Keep this page open until you submit."}{" "}
            Your date is not reserved by submitting.
          </p>
        </form>
      </div>
    </div>
  );
}
