import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Unlink,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

interface MenuButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}

function MenuButton({
  onClick,
  isActive,
  disabled,
  children,
  title,
}: MenuButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-colors ${
        isActive
          ? "bg-gray-900 text-white"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

function MenuBar({ editor }: { editor: Editor | null }) {
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const setLink = useCallback(() => {
    if (!editor) return;

    if (linkUrl === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // Add https:// if no protocol is specified
    const url = linkUrl.match(/^https?:\/\//) ? linkUrl : `https://${linkUrl}`;

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();

    setLinkUrl("");
    setShowLinkInput(false);
  }, [editor, linkUrl]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-gray-200 pb-3 mb-4">
      <div className="flex flex-wrap items-center gap-1">
        {/* Text Formatting */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <Bold size={18} />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <Italic size={18} />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        {/* Links */}
        <div className="relative">
          <MenuButton
            onClick={() => setShowLinkInput(!showLinkInput)}
            isActive={editor.isActive("link")}
            title="Add Link"
          >
            <LinkIcon size={18} />
          </MenuButton>

          {showLinkInput && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50 min-w-[280px]">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Enter URL..."
                  className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setLink();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={setLink}
                  className="px-3 py-1.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>

        {editor.isActive("link") && (
          <MenuButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            title="Remove Link"
          >
            <Unlink size={18} />
          </MenuButton>
        )}

        <div className="w-px h-6 bg-gray-200 mx-2" />

        {/* Lists */}
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List size={18} />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          title="Blockquote"
        >
          <Quote size={18} />
        </MenuButton>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        {/* Undo/Redo */}
        <MenuButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={18} />
        </MenuButton>

        <MenuButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          title="Redo (Ctrl+Y)"
        >
          <Redo size={18} />
        </MenuButton>
      </div>
    </div>
  );
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable headings for simpler blog content
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[100px]",
      },
    },
  });

  // Update editor content when prop changes (for initial load)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />

      {/* Editor Styles */}
      <style>{`
        .ProseMirror {
          min-height: 100px;
          outline: none;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #9ca3af;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .ProseMirror ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .ProseMirror blockquote {
          border-left: 3px solid #e5e7eb;
          padding-left: 1rem;
          font-style: italic;
          color: #6b7280;
        }
        .ProseMirror p {
          margin-bottom: 0.75rem;
        }
      `}</style>
    </div>
  );
}
