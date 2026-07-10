"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import EditableTitle from "./EditableTitle";
import LogoUploader from "./LogoUploader";

export default function QuotationHeader() {
  const { setValue, watch } = useFormContext();
  const [showSubtitle, setShowSubtitle] = useState(false);

  const title = watch("title") || "QUOTATION";
  const subtitle = watch("subtitle") || "";
  const logo = watch("logo");

  const handleTitleChange = (newTitle) => {
    setValue("title", newTitle, { shouldValidate: true });
  };

  const handleSubtitleChange = (newSubtitle) => {
    setValue("subtitle", newSubtitle, { shouldValidate: true });
  };

  const handleLogoChange = (newLogo) => {
    setValue("logo", newLogo, { shouldValidate: true });
  };

  const handleAddSubtitle = () => {
    setShowSubtitle(true);
    setTimeout(() => {
      // Focus will be handled by EditableTitle component
    }, 100);
  };

  const handleRemoveSubtitle = () => {
    setValue("subtitle", "", { shouldValidate: true });
    setShowSubtitle(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-8 shadow-sm mb-6">
      <div className="flex items-start justify-between">
        {/* Center Section - Title and Subtitle */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Main Title */}
          <EditableTitle
            value={title}
            onChange={handleTitleChange}
            placeholder="QUOTATION"
            className="text-3xl font-bold tracking-wide"
            editIconClassName="text-muted-foreground"
          />

          {/* Subtitle or Add Subtitle Button */}
          {showSubtitle || subtitle ? (
            <div className="mt-2 flex items-center gap-2">
              <EditableTitle
                value={subtitle}
                onChange={handleSubtitleChange}
                placeholder="Add subtitle..."
                className="text-sm text-muted-foreground"
              />
              <button
                type="button"
                onClick={handleRemoveSubtitle}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAddSubtitle}
              className="mt-2 text-xs text-muted-foreground hover:text-primary"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Subtitle
            </Button>
          )}
        </div>

        {/* Right Section - Logo */}
        <div className="ml-8">
          <LogoUploader value={logo} onChange={handleLogoChange} />
        </div>
      </div>
    </div>
  );
}
