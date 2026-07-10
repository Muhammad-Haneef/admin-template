"use client";

import React, { useState } from "react";
import { TextInput, PhoneInput, TextareaInput } from "@/components/FormElements";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactDetails() {
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
          <Phone className="w-5 h-5 text-primary" />
          Contact Details
        </h3>
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {isExpanded && (
        <div className="mt-4 space-y-4 border-t border-border pt-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PhoneInput
              name="contactDetails.phone"
              label="Phone"
              placeholder="Enter phone number"
              defaultCountry="PK"
            />
            <PhoneInput
              name="contactDetails.mobile"
              label="Mobile"
              placeholder="Enter mobile number"
              defaultCountry="PK"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              name="contactDetails.email"
              label="Email"
              placeholder="email@example.com"
            />
            <TextInput
              name="contactDetails.website"
              label="Website"
              placeholder="www.example.com"
            />
          </div>

          <TextareaInput
            name="contactDetails.address"
            label="Address"
            placeholder="Enter contact address..."
            rows={3}
          />
        </div>
      )}
    </div>
  );
}
