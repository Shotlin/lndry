export class BodyTooLargeError extends Error {
  constructor() {
    super("Request body too large");
  }
}

/**
 * Reads a request body as JSON while enforcing a hard byte cap on the bytes
 * actually received. `Content-Length` is attacker-controlled (and absent for
 * chunked uploads), so it is only used as a cheap early reject.
 */
export async function readJsonBody(request: Request, maxBytes: number): Promise<unknown> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declared) && declared > maxBytes) throw new BodyTooLargeError();

  if (!request.body) throw new SyntaxError("Empty body");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > maxBytes) {
      await reader.cancel().catch(() => undefined);
      throw new BodyTooLargeError();
    }
    chunks.push(value);
  }

  const merged = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return JSON.parse(new TextDecoder().decode(merged));
}
