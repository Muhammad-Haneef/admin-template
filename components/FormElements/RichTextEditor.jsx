"use client";

import dynamic from "next/dynamic";
import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[200px] rounded-md border border-input bg-background p-4 flex items-center justify-center text-sm text-muted-foreground">
      Loading editor...
    </div>
  ),
});

export default function RichTextEditor({
  name,
  label,
  placeholder = "Write something...",
  is_required = false,
  helperText,
  tooltip,
  disabled = false,
  height = 200,
  className = "",
  ...props
}) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const editorRef = useRef(null);
  const value = watch(name) || "";
  const error = errors[name]?.message;

  const modules = {
    toolbar: [
      [{ header: [2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: { matchVisual: false },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
    "link",
    "image",
  ];

  useEffect(() => {
    const quill = editorRef.current?.getEditor?.();
    if (!quill) return;

    if (!quill.history) {
      quill.history = quill.getModule("history");
    }

    quill.keyboard.bindings["undo"] = [];
    quill.keyboard.bindings["redo"] = [];

    quill.keyboard.addBinding({ key: "z", shortKey: true }, () => {
      quill.history.undo();
    });

    quill.keyboard.addBinding({ key: "y", shortKey: true }, () => {
      quill.history.redo();
    });

    quill.keyboard.addBinding(
      { key: "z", shortKey: true, shiftKey: true },
      () => {
        quill.history.redo();
      }
    );
  }, []);

  const handleChange = (content) => {
    setValue(name, content, { shouldValidate: true });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label
          htmlFor={name}
          className={error ? "text-destructive" : ""}
        >
          {label}
          {is_required && <span className="text-destructive ml-1">*</span>}
          {tooltip && (
            <span className="ml-1 text-xs text-muted-foreground">
              ({tooltip})
            </span>
          )}
        </Label>
      )}

      <div
        className={`rounded-md border ${
          error ? "border-destructive" : "border-input"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        style={{ minHeight: height }}
      >
        <ReactQuill
          ref={editorRef}
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          readOnly={disabled}
          theme="snow"
          {...props}
        />
      </div>

      {helperText && !error && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
