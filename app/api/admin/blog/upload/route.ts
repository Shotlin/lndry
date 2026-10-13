import { adminJson } from "@/lib/http/security";
import { guardAdminWrite } from "@/lib/blog/admin-api";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;

/** Detects the real image type from the file's first bytes — never trusts the browser's claim. */
function sniffImage(bytes: Uint8Array): { mime: string; ext: string } | null {
  const startsWith = (...sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (startsWith(0xff, 0xd8, 0xff)) return { mime: "image/jpeg", ext: "jpg" };
  if (startsWith(0x89, 0x50, 0x4e, 0x47)) return { mime: "image/png", ext: "png" };
  if (startsWith(0x47, 0x49, 0x46, 0x38)) return { mime: "image/gif", ext: "gif" };
  if (startsWith(0x52, 0x49, 0x46, 0x46) && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) {
    return { mime: "image/webp", ext: "webp" };
  }
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70 && bytes[8] === 0x61 && bytes[9] === 0x76 && bytes[10] === 0x69 && bytes[11] === 0x66) {
    return { mime: "image/avif", ext: "avif" };
  }
  return null;
}

export async function POST(request: Request) {
  const guard = await guardAdminWrite(request, { json: false });
  if ("response" in guard) return guard.response;

  let file: File | null = null;
  try {
    const form = await request.formData();
    const entry = form.get("file");
    file = entry instanceof File ? entry : null;
  } catch {
    return adminJson({ error: "Please choose an image to upload." }, { status: 400 });
  }

  if (!file || file.size === 0) return adminJson({ error: "Please choose an image to upload." }, { status: 400 });
  if (file.size > MAX_BYTES) return adminJson({ error: "Images must be 5 MB or smaller." }, { status: 413 });

  const buffer = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(buffer);
  if (!kind) return adminJson({ error: "Use a JPG, PNG, WebP, GIF or AVIF image." }, { status: 415 });

  const now = new Date();
  const path = `${now.getUTCFullYear()}/${String(now.getUTCMonth() + 1).padStart(2, "0")}/${crypto.randomUUID()}.${kind.ext}`;

  const { error } = await guard.access.supabase.storage
    .from("blog-images")
    .upload(path, buffer, { contentType: kind.mime, cacheControl: "31536000", upsert: false });

  if (error) {
    return adminJson({ error: "We could not upload this image. Please try again." }, { status: 500 });
  }

  const { data } = guard.access.supabase.storage.from("blog-images").getPublicUrl(path);
  return adminJson({ url: data.publicUrl }, { status: 201 });
}
