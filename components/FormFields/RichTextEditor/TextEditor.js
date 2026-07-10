"use client";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { useEditorConfig } from "./hooks/useEditorConfig";
import { useImageUpload } from "./hooks/useImageUpload";
import { useDebounce } from "./libs/editor-utils";
import { EditorLabel } from "./EditorLabel";
import { EditorFooter } from "./EditorFooter";
import { useEditorStore } from "./store/editorStore";
import "react-quill-new/dist/quill.snow.css";
import "./TextEditor.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="ql-container ql-snow">
      <div className="ql-editor" style={{ height: "200px" }}>
        <div className="flex items-center justify-center h-full text-gray-500">
          Loading editor...
        </div>
      </div>
    </div>
  ),
});

export default function TextEditor({
  label,
  value,
  onChange,
  placeholder = "Write something...",
  error,
  helperText,
  tooltip,
  id,
  disabled = false,
  readOnly = false,
  required = false,
  height = 200,
  theme = "snow",
  toolbarConfig = "full",
  formatsConfig = "full",
  allowImageUpload = true,
  allowVideoUpload = true,
  maxLength,
  showCharCount = false,
  className = "",
  getCharCount,
  showDrawer,
  hideDrawer,
  MediaAdd,
  uploadEndpoint,
  onImageUpload,
  ...props
}) {
  const inputId = id || `texteditor-${Math.random().toString(36).substring(2)}`;
  const editorRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const quill = editorRef.current?.getEditor?.();
    if (!quill) return;

    // Ensure history module is enabled
    if (!quill.history) {
      quill.history = quill.getModule("history");
    }

    // Clear any existing bindings to avoid duplicates
    quill.keyboard.bindings["undo"] = [];
    quill.keyboard.bindings["redo"] = [];

    // ✅ Add Undo binding
    quill.keyboard.addBinding({ key: "z", shortKey: true }, function () {
      quill.history.undo();
    });

    // ✅ Add Redo bindings
    quill.keyboard.addBinding({ key: "y", shortKey: true }, function () {
      quill.history.redo();
    });

    // macOS-friendly Redo (Cmd+Shift+Z)
    quill.keyboard.addBinding(
      { key: "z", shortKey: true, shiftKey: true },
      function () {
        quill.history.redo();
      }
    );
  }, [isClient]);

  // Store
  const { contentSize, setContentSize, uploading } = useEditorStore();

  // Hooks
  const { toolbar, formats } = useEditorConfig(toolbarConfig, formatsConfig);
  const { imageUrls, setImageUrls, uploadImage, handleBase64Image } =
    useImageUpload(uploadEndpoint, onImageUpload);

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Debounce for calculating content size
  const debouncedSetContentSize = useDebounce((sizeInBytes) => {
    setContentSize(sizeInBytes);
  }, 400);

  const debouncedCharCount = useDebounce((len) => {
    getCharCount?.(len);
  }, 400);

  // 🖼️ Media Library Image Handler
  const handleMediaLibrarySelect = () => {
    if (!allowImageUpload || !showDrawer || !MediaAdd) return;

    showDrawer({
      title: "Select Image",
      size: "lg",
      content: (
        <MediaAdd
          onSelectMedia={(media) => {
            if (media?.file_url) {
              insertImageToEditor(media.file_url);
              hideDrawer();
            }
          }}
        />
      ),
    });
  };

  // 🧩 Insert image into Quill editor
  const insertImageToEditor = (imageUrl) => {
    const editor = editorRef.current?.getEditor();
    if (!editor) return;

    const range = editor.getSelection(true);
    if (range) {
      editor.insertEmbed(range.index, "image", imageUrl);
      // Move cursor after the image
      editor.setSelection(range.index + 1, 0);
    }
  };

  // 📸 Toolbar Image Upload Handler
  const imageHandler = () => {
    if (!allowImageUpload) return;

    // Use Media Library drawer instead of file input
    if (showDrawer && MediaAdd) {
      handleMediaLibrarySelect();
    } else {
      // Fallback to original file input if MediaAdd is not provided
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        if (file) {
          const imageUrl = await uploadImage(file);
          if (imageUrl) insertImageToEditor(imageUrl);
        }
      };
    }
  };

  const videoHandler = () => {
    if (!allowVideoUpload) return;

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const videoUrl = URL.createObjectURL(file);
        const quill = editorRef.current?.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "video", videoUrl);
      }
    };
  };

  // 🧠 Enhanced event handlers for paste and drop - Base64 Image Handling
  useEffect(() => {
    if (!isClient) return;

    const quill = editorRef.current?.getEditor();
    if (!quill) return;

    const editorElement = quill.root;

    // Handle drop event
    const handleDrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer?.files || []);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        if (imageUrl) insertImageToEditor(imageUrl);
      }
    };

    // Handle paste event
    const handlePaste = async (e) => {
      const clipboardItems = Array.from(e.clipboardData?.items || []);
      const imageItem = clipboardItems.find((item) =>
        item.type.startsWith("image/")
      );

      if (imageItem) {
        e.preventDefault();
        e.stopPropagation();

        const file = imageItem.getAsFile();
        const imageUrl = await uploadImage(file);
        if (imageUrl) insertImageToEditor(imageUrl);
      }
    };

    editorElement.addEventListener("drop", handleDrop, true);
    editorElement.addEventListener("paste", handlePaste, true);

    return () => {
      editorElement.removeEventListener("drop", handleDrop, true);
      editorElement.removeEventListener("paste", handlePaste, true);
    };
  }, [isClient]);

  // 🧹 Handle content change - find and convert any remaining base64 images
  const handleChange = async (content) => {
    if (!isClient) return;

    // Find base64 images in content
    const base64Regex =
      /<img[^>]*src="(data:image\/[^;]+;base64[^"]*)"[^>]*>/gi;
    const base64Matches = content.match(base64Regex);

    if (base64Matches && base64Matches.length > 0) {
      // If there are base64 images, process them
      let updatedContent = content;

      for (const imgTag of base64Matches) {
        const srcMatch = imgTag.match(/src="([^"]*)"/);
        if (srcMatch && srcMatch[1]) {
          const base64String = srcMatch[1];
          const imageUrl = await handleBase64Image(base64String);

          if (imageUrl) {
            // Replace base64 image with uploaded image URL
            updatedContent = updatedContent.replace(
              imgTag,
              imgTag.replace(base64String, imageUrl)
            );
          }
        }
      }

      // Update with cleaned content
      content = updatedContent;
    }

    // Track images for cleanup
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const currentImages = Array.from(doc.querySelectorAll("img"))
      .map((img) => img.src)
      .filter((src) => !src.startsWith("data:")); // Filter out base64 images

    setImageUrls(currentImages);
    onChange?.(content);

    // Calculate content size and character count
    const contentInBytes = new Blob([content]).size;
    debouncedSetContentSize(contentInBytes);

    const textOnly = content.replace(/<[^>]*>/g, "");
    debouncedCharCount(textOnly.length);
  };

  const modules = {
    toolbar: {
      container: Array.isArray(toolbarConfig) ? toolbarConfig : toolbar,
      handlers: {
        ...(allowImageUpload && { image: imageHandler }),
        ...(allowVideoUpload && { video: videoHandler }),
      },
    },
    clipboard: { matchVisual: false },
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  };

  // Don't render table controls on server
  if (!isClient) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative group">
          <EditorLabel
            label={label}
            required={required}
            error={error}
            tooltip={tooltip}
            htmlFor={inputId}
          />
          <div className="rounded-lg border border-gray-300 min-h-[200px] p-4 bg-gray-50 flex items-center justify-center text-gray-500">
            Loading editor...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="relative group">
        <EditorLabel
          label={label}
          required={required}
          error={error}
          tooltip={tooltip}
          htmlFor={inputId}
        />

        <div
          className={`rounded-lg transition-all duration-200 ${
            error && "border-red-500 shadow-sm shadow-red-100"
          } ${
            disabled || readOnly
              ? "bg-gray-50 opacity-60 cursor-not-allowed"
              : ""
          }`}
        >
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10 text-sm font-medium rounded-lg">
              Uploading image...
            </div>
          )}

          <ReactQuill
            id={inputId}
            theme={theme}
            value={value || ""}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            readOnly={disabled || readOnly}
            ref={editorRef}
            {...props}
          />
        </div>

        <EditorFooter
          value={value}
          contentSize={contentSize}
          showCharCount={showCharCount}
          error={error}
          helperText={helperText}
        />
      </div>
    </div>
  );
}
