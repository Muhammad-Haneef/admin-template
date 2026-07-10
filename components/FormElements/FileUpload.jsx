"use client";

import * as React from "react";
import { useState, useId, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Upload, X, File, Image, FileText, FileVideo } from "lucide-react";
import { cn } from "@/lib/utils";

const getFileIcon = (file) => {
  const type = file.type || "";
  if (type.startsWith("image/")) return <Image className="h-4 w-4" />;
  if (type.startsWith("video/")) return <FileVideo className="h-4 w-4" />;
  if (type.includes("pdf")) return <FileText className="h-4 w-4" />;
  return <File className="h-4 w-4" />;
};

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

function FileUploadBase({
  label, error, helperText, tooltip, disabled, id, is_required,
  value = [], onChange, onBlur, multiple = false, accept, maxSize, maxFiles,
  dir = "ltr", className, ...props
}) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const dropRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState(null);
  const files = Array.isArray(value) ? value : value ? [value] : [];

  const handleFiles = (newFiles) => {
    if (disabled) return;
    setFileError(null);
    let validFiles = Array.from(newFiles);

    if (maxSize) {
      const oversized = validFiles.filter((f) => f.size > maxSize);
      if (oversized.length > 0) {
        setFileError(`File size exceeds ${formatSize(maxSize)} limit.`);
        return;
      }
    }

    if (maxFiles && files.length + validFiles.length > maxFiles) {
      setFileError(`Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed.`);
      return;
    }

    const updated = multiple ? [...files, ...validFiles] : validFiles.slice(0, 1);
    if (onChange) onChange(updated);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    const updated = files.filter((_, i) => i !== index);
    if (onChange) onChange(updated);
  };

  const displayError = error || fileError;

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)} dir={dir}>
      {label && (
        <div className="flex items-center gap-1.5">
          <Label htmlFor={inputId} className={cn("text-xs font-semibold uppercase tracking-wider text-muted-foreground", displayError && "text-destructive", disabled && "opacity-50")}>
            {label}{is_required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild><HelpCircle className="h-3.5 w-3.5 text-muted-foreground/75 cursor-pointer hover:text-foreground" /></TooltipTrigger>
                <TooltipContent><p className="max-w-xs text-xs">{tooltip}</p></TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        id={inputId}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onChange={(e) => { if (e.target.files) { handleFiles(e.target.files); e.target.value = ""; } }}
        {...props}
      />

      <div
        ref={dropRef}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 w-full h-28 rounded-lg border-2 border-dashed border-input transition-all cursor-pointer",
          "hover:border-ring hover:bg-accent/30",
          isDragging && "border-ring bg-accent/40 scale-[1.01]",
          displayError && "border-destructive hover:border-destructive/80",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <div className={cn("p-2.5 rounded-full border border-input bg-muted transition-all", isDragging && "bg-accent border-ring")}>
          <Upload className={cn("h-5 w-5 text-muted-foreground", isDragging && "text-foreground")} />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-sm font-medium text-foreground">{isDragging ? "Drop to upload" : "Click to upload or drag & drop"}</span>
          <span className="text-xs text-muted-foreground">
            {accept ? `Accepted: ${accept}` : "Any file format"}
            {maxSize && ` · Max ${formatSize(maxSize)}`}
            {maxFiles && ` · Max ${maxFiles} file${maxFiles > 1 ? "s" : ""}`}
          </span>
        </div>
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-1.5 mt-1">
          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-input bg-background group hover:bg-accent/30 transition-colors">
              <span className="text-muted-foreground shrink-0">{getFileIcon(file)}</span>
              <div className="flex flex-col flex-1 overflow-hidden">
                <span className="text-xs font-medium text-foreground truncate">{file.name}</span>
                <span className="text-[10px] text-muted-foreground">{formatSize(file.size)}</span>
              </div>
              {!disabled && (
                <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => { e.stopPropagation(); handleRemove(index); }}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}

      {(helperText || displayError) && (
        <div className="text-[11px] px-0.5">
          {displayError ? <span className="text-destructive font-medium animate-in fade-in-50 slide-in-from-top-1 duration-200">{displayError}</span>
            : <span className="text-muted-foreground">{helperText}</span>}
        </div>
      )}
    </div>
  );
}

export default function FileUpload({ name, ...props }) {
  const formContext = useFormContext();
  if (formContext && name) {
    return (
      <Controller name={name} control={formContext.control}
        render={({ field, fieldState: { error } }) => (
          <FileUploadBase {...field} error={error?.message || props.error} {...props} />
        )}
      />
    );
  }
  return <FileUploadBase {...props} />;
}
