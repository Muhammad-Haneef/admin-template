"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { CheckboxInput, TextInput, TextareaInput } from "@/components/FormElements";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ShippingDetails() {
  const { watch } = useFormContext();
  const shippingEnabled = watch("shippingEnabled");

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <CheckboxInput
          name="shippingEnabled"
          label="Add Shipping Details"
        />
        {shippingEnabled ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </div>

      {shippingEnabled && (
        <div className="space-y-4 border-t border-border pt-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              name="shippingDetails.name"
              label="Recipient Name"
              placeholder="Enter recipient name"
            />
            <TextInput
              name="shippingDetails.phone"
              label="Contact Number"
              placeholder="Enter contact number"
            />
          </div>

          <TextareaInput
            name="shippingDetails.address"
            label="Shipping Address"
            placeholder="Enter complete shipping address"
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput
              name="shippingDetails.city"
              label="City"
              placeholder="Enter city"
            />
            <TextInput
              name="shippingDetails.state"
              label="State/Province"
              placeholder="Enter state"
            />
            <TextInput
              name="shippingDetails.postalCode"
              label="Postal Code"
              placeholder="Enter postal code"
            />
          </div>

          <TextInput
            name="shippingDetails.country"
            label="Country"
            placeholder="Enter country"
          />

          <TextareaInput
            name="shippingDetails.notes"
            label="Shipping Notes"
            placeholder="Any special instructions for delivery..."
            rows={2}
          />
        </div>
      )}
    </div>
  );
}
