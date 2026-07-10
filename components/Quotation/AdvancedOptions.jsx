"use client";

import React, { useState } from "react";
import { SwitchInput } from "@/components/FormElements";
import { ChevronDown, ChevronUp, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdvancedOptions() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-0 hover:bg-transparent"
      >
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Advanced Options
        </h3>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {isExpanded && (
        <div className="mt-4 space-y-3 border-t border-border pt-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SwitchInput
              name="advancedOptions.displayUnit"
              label="Display Unit"
            />
            
            <SwitchInput
              name="advancedOptions.mergeQuantity"
              label="Merge Quantity"
            />
            
            <SwitchInput
              name="advancedOptions.showTaxSummary"
              label="Show Tax Summary"
            />
            
            <SwitchInput
              name="advancedOptions.hideCountry"
              label="Hide Country"
            />
            
            <SwitchInput
              name="advancedOptions.hideOriginalImages"
              label="Hide Original Images"
            />
            
            <SwitchInput
              name="advancedOptions.showThumbnails"
              label="Show Thumbnails"
            />
            
            <SwitchInput
              name="advancedOptions.showFullDescription"
              label="Show Full Description"
            />
            
            <SwitchInput
              name="advancedOptions.hideGroupSubtotal"
              label="Hide Group Subtotal"
            />
            
            <SwitchInput
              name="advancedOptions.showSKU"
              label="Show SKU"
            />
            
            <SwitchInput
              name="advancedOptions.showSerialNumber"
              label="Show Serial Number"
            />
            
            <SwitchInput
              name="advancedOptions.displayBatchDetails"
              label="Display Batch Details"
            />
            
            <SwitchInput
              name="advancedOptions.showItemImages"
              label="Show Item Images"
            />
          </div>
        </div>
      )}
    </div>
  );
}
