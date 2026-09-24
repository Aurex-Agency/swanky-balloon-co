import { inquirySchema, normalizeInquiry } from "@/lib/inquiry";
import { deliverInquiry } from "@/lib/integrations/ghl";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json"))
    return Response.json(
      { error: "Send the inquiry as JSON." },
      { status: 415 },
    );
  if (Number(request.headers.get("content-length")) > 32768)
    return Response.json(
      { error: "This inquiry is too large." },
      { status: 413 },
    );
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader)
      return Response.json(
        { error: "An inquiry is required." },
        { status: 400 },
      );
    const decoder = new TextDecoder();
    let content = "";
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 32768) {
        await reader.cancel();
        return Response.json(
          { error: "This inquiry is too large." },
          { status: 413 },
        );
      }
      content += decoder.decode(value, { stream: true });
    }
    content += decoder.decode();
    raw = JSON.parse(content);
  } catch {
    return Response.json(
      { error: "Please send a valid inquiry." },
      { status: 400 },
    );
  }
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success)
    return Response.json(
      {
        error: "Please check the highlighted details.",
        fields: Object.fromEntries(
          parsed.error.issues.map((i) => [i.path.join("."), i.message]),
        ),
      },
      { status: 400 },
    );
  const inquiry = normalizeInquiry(parsed.data);
  try {
    const result = await deliverInquiry(inquiry);
    return Response.json(
      { success: true, demo: result.demo, id: inquiry.id },
      { status: 201 },
    );
  } catch {
    // Do not log provider responses, webhook URLs, email, phone, or free-text notes.
    console.error("[Swanky inquiry] Delivery unavailable");
    return Response.json(
      {
        error:
          "Your inquiry could not be delivered. Your details are saved here. Please try again shortly.",
      },
      { status: 502 },
    );
  }
}
