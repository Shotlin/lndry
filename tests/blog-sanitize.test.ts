import { describe, expect, it } from "vitest";
import { sanitizePostHtml } from "@/lib/blog/sanitize";

describe("sanitizePostHtml", () => {
  it("strips script, handlers, javascript: and data: URLs", () => {
    const out = sanitizePostHtml(
      `<p onclick="x()">hi</p><script>alert(1)</script><a href="javascript:alert(1)">l</a>` +
        `<img src="data:text/html;base64,AAAA"><img src="x" onerror="alert(1)"><iframe src="https://e.x"></iframe>`,
    );
    expect(out).not.toMatch(/script|onclick|onerror|javascript:|data:|iframe/i);
    expect(out).toContain("<p>hi</p>");
  });
  it("keeps heading ids (table of contents), tables and safe links", () => {
    const out = sanitizePostHtml(`<h2 id="intro">Intro</h2><table><tr><td>1</td></tr></table><a href="https://lndry.in/x">a</a>`);
    expect(out).toContain('<h2 id="intro">');
    expect(out).toContain("<table>");
    expect(out).toContain('href="https://lndry.in/x"');
  });
  it("forces noopener on external links and drops target on internal ones", () => {
    const out = sanitizePostHtml(`<a href="https://example.com" target="_blank">e</a><a href="https://lndry.in/a" target="_blank" rel="x">i</a>`);
    expect(out).toContain('rel="noopener noreferrer"');
    expect(out.match(/target=/g)?.length).toBe(1);
  });
  it("allows https images only and drops images with unsafe sources", () => {
    expect(sanitizePostHtml(`<img src="http://x/y.png">`)).toBe("");
    expect(sanitizePostHtml(`<img src="https://x/y.png">`)).toContain("<img");
  });
  it("does not allow arbitrary styles or classes", () => {
    const out = sanitizePostHtml(`<p style="position:fixed;top:0;text-align:center" class="evil">x</p>`);
    expect(out).not.toMatch(/position|class/);
    expect(out).toContain("text-align:center");
  });
  it("copes with empty and non-string input", () => {
    expect(sanitizePostHtml("")).toBe("");
    expect(sanitizePostHtml(undefined as unknown as string)).toBe("");
  });
});
