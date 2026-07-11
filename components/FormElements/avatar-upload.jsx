"use client";

import React, { useState, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X, Edit2, User } from "lucide-react";
import { cn } from "@/lib/utils";

function AvatarUploadBase({
  label,
  error,
  helperText,
  tooltip,
  disabled = false,
  value,
  onChange,
  onBlur,
  id,
  is_required,
  className,
  accept = "image/*",
  maxSize = 2 * 1024 * 1024, // 2MB
  size = "lg", // "sm", "md", "lg", "xl"
  shape = "circle", // "circle", "square"
  showEditButton = true,
  ...props
}) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState(null);

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40"
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg"
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleFile = (file) => {
    setImageError(null);

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file");
      return;
    }

    if (maxSize && file.size > maxSize) {
      setImageError(`Image size must be less than ${(maxSize / (1024 * 1024)).toFixed(1)}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onChange?.(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayError = error || imageError;

  return (
    <div className={cn("w-full flex flex-col gap-2 items-center", className)}>
      {label && (
        <Label className={cn("text-sm font-medium w-full text-left", displayError && "text-destructive", disabled && "opacity-50")}>
          {label}
          {is_required && <span className="text-destructive ml-1">*</span>}
        </Label>
      )}

      <div className="relative group">
        {value ? (
          <div className={cn("relative overflow-hidden border-2 border-border", sizeClasses[size], shapeClasses[shape])}>
            <img
              src={value}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
            {!disabled && showEditButton && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="h-8 w-8"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={(e) => {
              if (!disabled) {
                fileInputRef.current?.click();
              }
            }}
            className={cn(
              "relative flex flex-col items-center justify-center border-2 border-dashed transition-all cursor-pointer",
              sizeClasses[size],
              shapeClasses[shape],
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/30",
              displayError && "border-destructive",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none"
            )}
          >
            {isDragging ? (
              <Upload className="w-8 h-8 text-primary" />
            ) : (
              <User className="w-10 h-10 text-muted-foreground" />
            )}
          </div>
        )}
      </div>

      {!value && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="text-xs"
        >
          <Upload className="w-3 h-3 mr-1" />
          Upload Photo
        </Button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        {...props}
      />

      {(helperText || displayError) && (
        <p className={cn("text-xs text-center w-full", displayError ? "text-destructive" : "text-muted-foreground")}>
          {displayError || helperText}
        </p>
      )}
    </div>
  );
}

export default function AvatarUpload({ name, ...props }) {
  const formContext = useFormContext();

  if (formContext && name) {
    return (
      <Controller
        name={name}
        control={formContext.control}
        render={({ field, fieldState: { error } }) => (
          <AvatarUploadBase
            {...field}
            error={error?.message || props.error}
            {...props}
          />
        )}
      />
    );
  }

  return <AvatarUploadBase {...props} />;
}
