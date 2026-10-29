import "server-only";

import sanitizeHtml from "sanitize-html";

/**
 * Defence in depth for article HTML. The LNDRY backend already sanitises on
 * save, but this page injects the result with dangerouslySetInnerHTML, so a
 * single bad row (a manual DB edit, an old record, a backend regression) must
 * not become stored XSS on the public site. The allow-list mirrors the
 * backend's (`sanitizeBlogHtml`).
 */
export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(String(html || ""), {
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
    allowedStyles: { "*": { "text-align": [/^(left|right|center|justify)$/] } },
    allowedSchemes: ["https", "http", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https"] },
    allowedSchemesAppliedToAttributes: ["href", "src"],
    allowProtocolRelative: false,
    allowedClasses: { code: [/^language-[a-z0-9+#-]+$/i], pre: [/^language-[a-z0-9+#-]+$/i] },
    exclusiveFilter: (frame) => frame.tag === "img" && !frame.attribs.src,
    transformTags: {
      a: (tagName, attribs) => {
        const next = { ...attribs };
        if (/^https?:\/\//i.test(next.href ?? "") && !/^https?:\/\/(www\.)?lndry\.in(\/|$)/i.test(next.href)) {
          next.target = "_blank";
          next.rel = "noopener noreferrer";
        } else {
          delete next.target;
          delete next.rel;
        }
        return { tagName, attribs: next };
      },
    },
  });
}
