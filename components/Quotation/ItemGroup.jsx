"use client";

import React, { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, GripVertical, Copy, Trash2 } from "lucide-react";
import { calculateGroupSubtotal, formatCurrency } from "@/lib/quotation-utils";
import { TextInput, TextareaInput, FileUpload } from "@/components/FormElements";

export default function ItemGroup({ groupIndex, groupId, onRemove, onDuplicate }) {
  const { control, watch, setValue } = useFormContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showImage, setShowImage] = useState(false);
  
  const items = watch("items") || [];
  const group = items.find(item => item.id === groupId && item.type === "group");
  const currency = watch("currency") || "PKR";
  
  const groupSubtotal = calculateGroupSubtotal(items, groupId);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // Update in form state
    const groupItem = items.find(item => item.id === groupId);
    if (groupItem) {
      const itemIndex = items.indexOf(groupItem);
      setValue(`items.${itemIndex}.collapsed`, !isCollapsed);
    }
  };

  return (
    <div className="border-2 border-primary/20 rounded-lg bg-primary/5 overflow-hidden">
      {/* Group Header */}
      <div className="bg-primary/10 p-4 flex items-center justify-between border-b border-primary/20">
        <div className="flex items-center gap-3 flex-1">
          {/* Drag Handle */}
          <button
            type="button"
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
          >
            <GripVertical className="w-4 h-4" />
          </button>

          {/* Group Title */}
          <div className="flex-1">
            <input
              type="text"
              value={group?.name || ""}
              onChange={(e) => {
                const itemIndex = items.findIndex(item => item.id === groupId);
                if (itemIndex >= 0) {
                  setValue(`items.${itemIndex}.name`, e.target.value);
                }
              }}
              placeholder="Group Name (e.g., Engine Repair)"
              className="w-full bg-transparent border-0 border-b-2 border-transparent hover:border-primary/30 focus:border-primary outline-none font-semibold text-base px-2 py-1"
            />
          </div>

          {/* Group Subtotal */}
          <div className="text-sm font-semibold text-primary">
            {formatCurrency(groupSubtotal, currency)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-4">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleToggleCollapse}
            className="h-8 w-8"
          >
            {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onDuplicate}
            className="h-8 w-8"
          >
            <Copy className="w-4 h-4" />
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onRemove}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Group Content - Collapsible */}
      {!isCollapsed && (
        <div className="p-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          {/* Group Description */}
          <div>
            <TextareaInput
              value={group?.description || ""}
              onChange={(e) => {
                const itemIndex = items.findIndex(item => item.id === groupId);
                if (itemIndex >= 0) {
                  setValue(`items.${itemIndex}.description`, e.target.value);
                }
              }}
              placeholder="Group description (optional)"
              rows={2}
              className="text-sm"
            />
          </div>

          {/* Group Image */}
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowImage(!showImage)}
              className="text-xs"
            >
              {showImage ? "Hide" : "Add"} Group Image
            </Button>
          </div>

          {showImage && (
            <div className="border border-border rounded-lg p-3 bg-background">
              <FileUpload
                value={group?.image ? [group.image] : []}
                onChange={(files) => {
                  const itemIndex = items.findIndex(item => item.id === groupId);
                  if (itemIndex >= 0) {
                    setValue(`items.${itemIndex}.image`, files[0]);
                  }
                }}
                accept="image/*"
                maxFiles={1}
                label="Group Image"
                helperText="Upload an image for this group"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
