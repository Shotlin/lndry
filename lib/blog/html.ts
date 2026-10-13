import "server-only";

import sanitizeHtml from "sanitize-html";
import { slugify, stripHtml } from "./text";

const ALIGN = [/^(left|right|center|justify)$/];

/**
 * Everything the editor can produce, and nothing else. Run on every save so
 * stored HTML is always safe to render with dangerouslySetInnerHTML.
 */
export function sanitizeBlogHtml(html: string) {
  const clean = sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s", "code", "pre",
      "blockquote", "ul", "ol", "li", "a", "img", "hr",
      "table", "thead", "tbody", "tr", "th", "td", "colgroup", "col",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
      th: ["colspan", "rowspan", "style"],
      td: ["colspan", "rowspan", "style"],
      p: ["style"],
      h2: ["style", "id"],
      h3: ["style", "id"],
      h4: ["style", "id"],
      code: ["class"],
      pre: ["class"],
      ol: ["start"],
      col: ["span"],
    },
    allowedStyles: {
      "*": { "text-align": ALIGN },
    },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    allowedSchemesAppliedToAttributes: ["href", "src"],
    allowProtocolRelative: false,
    allowedClasses: { code: [/^language-[a-z0-9+#-]+$/i], pre: [/^language-[a-z0-9+#-]+$/i] },
    // An image whose (unsafe) source was removed is meaningless — drop it entirely.
    exclusiveFilter: (frame) => frame.tag === "img" && !frame.attribs.src,
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const external = /^https?:\/\//i.test(href) && !/^https?:\/\/(www\.)?lndry\.in(\/|$)/i.test(href);
        const next: Record<string, string> = { ...attribs };
        if (external) {
          next.target = "_blank";
          next.rel = "noopener noreferrer";
        } else {
          delete next.target;
          delete next.rel;
        }
        return { tagName, attribs: next };
      },
      img: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, loading: "lazy", decoding: "async", alt: attribs.alt ?? "" },
      }),
      b: "strong",
      i: "em",
    },
  });

  // The editor leaves an empty paragraph after some blocks; drop empties at the edges.
  const trimmed = clean.replace(/^(\s*<p>\s*<\/p>)+/, "").replace(/(<p>\s*<\/p>\s*)+$/, "");
  return addHeadingIds(trimmed).trim();
}

/** Gives every h2–h4 a stable, unique id so the table of contents and deep links work. */
export function addHeadingIds(html: string) {
  const used = new Map<string, number>();
  return html.replace(/<h([2-4])((?:\s[^>]*)?)>([\s\S]*?)<\/h\1>/gi, (_m, level, attrs: string, inner: string) => {
    const base = slugify(stripHtml(inner), 60) || "section";
    const count = used.get(base) ?? 0;
    used.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    const withoutId = attrs.replace(/\sid="[^"]*"/i, "");
    return `<h${level} id="${id}"${withoutId}>${inner}</h${level}>`;
  });
}
