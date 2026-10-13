"use client";

import { useRef, useState } from "react";
import type { Editor, JSONContent } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import { Table, TableCell, TableHeader, TableRow } from "@tiptap/extension-table";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading2,
  Heading3,
  Heading4,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  LoaderCircle,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
} from "lucide-react";

interface Props {
  initialHtml: string;
  initialJson: unknown;
  onChange: (html: string, json: JSONContent) => void;
  onError: (message: string) => void;
}

async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch("/api/admin/blog/upload", { method: "POST", body });
  const data = (await response.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!response.ok || !data.url) throw new Error(data.error ?? "Upload failed.");
  return data.url;
}

function ToolButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`inline-flex size-9 items-center justify-center rounded-xs transition-colors disabled:opacity-35 ${
        active ? "bg-lavender-soft text-violet-deep" : "text-ink-soft hover:bg-surface-cool hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="mx-1 h-5 w-px bg-hairline" aria-hidden="true" />;

export function RichTextEditor({ initialHtml, initialJson, onChange, onError }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const editorRef = useRef<Editor | null>(null);

  async function insertFiles(files: File[]) {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (images.length === 0) return;
    setUploading(true);
    try {
      for (const file of images) {
        const src = await uploadImage(file);
        editorRef.current?.chain().focus().setImage({ src, alt: "" }).run();
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      Image.configure({ allowBase64: false }),
      Placeholder.configure({ placeholder: "Start writing your article… Use H2 headings for the main sections." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CharacterCount,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: (initialJson as JSONContent | null) ?? initialHtml ?? "",
    editorProps: {
      attributes: {
        class: "blog-prose min-h-[460px] px-5 py-5 outline-none sm:px-8",
        "aria-label": "Article body",
      },
      handleDrop: (_view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []);
        if (files.some((f) => f.type.startsWith("image/"))) {
          event.preventDefault();
          void insertFiles(files);
          return true;
        }
        return false;
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []);
        if (files.some((f) => f.type.startsWith("image/"))) {
          event.preventDefault();
          void insertFiles(files);
          return true;
        }
        return false;
      },
    },
    onCreate: ({ editor: created }) => {
      editorRef.current = created;
    },
    onUpdate: ({ editor: updated }) => {
      onChange(updated.getHTML(), updated.getJSON());
    },
  });

  if (!editor) {
    return <div className="min-h-[540px] rounded-sm border border-hairline bg-white" aria-busy="true" />;
  }

  const imageSelected = editor.isActive("image");
  const inTable = editor.isActive("table");

  function applyLink() {
    const url = linkUrl.trim();
    if (!url) {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      const href = /^(https?:\/\/|mailto:|tel:|\/)/i.test(url) ? url : `https://${url}`;
      editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    }
    setLinkOpen(false);
    setLinkUrl("");
  }

  return (
    <div className="overflow-hidden rounded-sm border border-hairline bg-white focus-within:border-violet">
      <div className="sticky top-0 z-20 border-b border-hairline bg-white/95 backdrop-blur">
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5" role="toolbar" aria-label="Formatting">
          <ToolButton label="Paragraph" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}><Pilcrow size={16} /></ToolButton>
          <ToolButton label="Heading 2 (main section)" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={18} /></ToolButton>
          <ToolButton label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={18} /></ToolButton>
          <ToolButton label="Heading 4" active={editor.isActive("heading", { level: 4 })} onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}><Heading4 size={18} /></ToolButton>
          <Divider />
          <ToolButton label="Bold (Ctrl+B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></ToolButton>
          <ToolButton label="Italic (Ctrl+I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></ToolButton>
          <ToolButton label="Underline (Ctrl+U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={16} /></ToolButton>
          <ToolButton label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></ToolButton>
          <ToolButton label="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code size={16} /></ToolButton>
          <Divider />
          <ToolButton label="Bulleted list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={17} /></ToolButton>
          <ToolButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={17} /></ToolButton>
          <ToolButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></ToolButton>
          <ToolButton label="Divider line" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={16} /></ToolButton>
          <Divider />
          <ToolButton label="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={16} /></ToolButton>
          <ToolButton label="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={16} /></ToolButton>
          <ToolButton label="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={16} /></ToolButton>
          <Divider />
          <ToolButton
            label="Add or edit link"
            active={editor.isActive("link")}
            onClick={() => {
              setLinkUrl((editor.getAttributes("link").href as string | undefined) ?? "");
              setLinkOpen((v) => !v);
            }}
          >
            <Link2 size={16} />
          </ToolButton>
          <ToolButton label="Remove link" disabled={!editor.isActive("link")} onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}><Unlink size={16} /></ToolButton>
          <ToolButton label="Upload image" disabled={uploading} onClick={() => fileInput.current?.click()}>
            {uploading ? <LoaderCircle size={16} className="animate-spin" /> : <ImagePlus size={17} />}
          </ToolButton>
          <ToolButton label="Insert table" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><TableIcon size={16} /></ToolButton>
          <Divider />
          <ToolButton label="Undo (Ctrl+Z)" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 size={16} /></ToolButton>
          <ToolButton label="Redo (Ctrl+Shift+Z)" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 size={16} /></ToolButton>
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
            multiple
            className="sr-only"
            tabIndex={-1}
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              e.target.value = "";
              void insertFiles(files);
            }}
          />
        </div>

        {linkOpen && (
          <form
            className="flex items-center gap-2 border-t border-hairline bg-surface-cool px-3 py-2"
            onSubmit={(e) => {
              e.preventDefault();
              applyLink();
            }}
          >
            <label htmlFor="blog-link-url" className="font-body text-xs font-semibold text-ink-soft">Link to</label>
            <input
              id="blog-link-url"
              autoFocus
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://… or /services"
              className="h-9 min-w-0 flex-1 rounded-xs border border-hairline bg-white px-3 font-body text-sm outline-none focus:border-violet"
            />
            <button type="submit" className="h-9 rounded-xs bg-violet px-4 font-body text-sm font-semibold text-white hover:bg-violet-deep">Apply</button>
            <button type="button" onClick={() => setLinkOpen(false)} className="h-9 px-2 font-body text-sm font-semibold text-ink-soft hover:text-ink">Cancel</button>
          </form>
        )}

        {imageSelected && (
          <div className="flex items-center gap-2 border-t border-hairline bg-surface-cool px-3 py-2">
            <label htmlFor="blog-image-alt" className="shrink-0 font-body text-xs font-semibold text-ink-soft">Image description (alt text)</label>
            <input
              id="blog-image-alt"
              value={(editor.getAttributes("image").alt as string | undefined) ?? ""}
              onChange={(e) => editor.chain().updateAttributes("image", { alt: e.target.value }).run()}
              placeholder="Describe the image for search engines and screen readers"
              className="h-9 min-w-0 flex-1 rounded-xs border border-hairline bg-white px-3 font-body text-sm outline-none focus:border-violet"
            />
          </div>
        )}

        {inTable && (
          <div className="flex flex-wrap items-center gap-1 border-t border-hairline bg-surface-cool px-3 py-2 font-body text-xs font-semibold">
            {[
              ["Add row", () => editor.chain().focus().addRowAfter().run()],
              ["Add column", () => editor.chain().focus().addColumnAfter().run()],
              ["Delete row", () => editor.chain().focus().deleteRow().run()],
              ["Delete column", () => editor.chain().focus().deleteColumn().run()],
              ["Delete table", () => editor.chain().focus().deleteTable().run()],
            ].map(([label, run]) => (
              <button key={label as string} type="button" onMouseDown={(e) => e.preventDefault()} onClick={run as () => void} className="rounded-xs border border-hairline bg-white px-2.5 py-1.5 text-ink-soft hover:border-violet hover:text-violet">
                {label as string}
              </button>
            ))}
          </div>
        )}
      </div>

      <EditorContent editor={editor} />

      <div className="flex items-center justify-between border-t border-hairline bg-surface-cool px-4 py-2 font-body text-xs text-ink-soft">
        <span>{editor.storage.characterCount.words()} words</span>
        <span>Drag, drop or paste images straight into the article</span>
      </div>
    </div>
  );
}
