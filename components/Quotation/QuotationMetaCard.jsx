"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { TextInput, DatePickerInput } from "@/components/FormElements";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { generateQuotationNumber, getPreviousQuotationNumber } from "@/lib/quotation-utils";

export default function QuotationMetaCard() {
  const { control, setValue, watch } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customFields"
  });

  const quotationNumber = watch("quotationNumber");
  const previousNumber = getPreviousQuotationNumber(quotationNumber);

  const handleAddCustomField = () => {
    append({
      label: "",
      value: "",
      type: "text"
    });
  };

  const handleGenerateNumber = () => {
    const newNumber = generateQuotationNumber();
    setValue("quotationNumber", newNumber, { shouldValidate: true });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h3 className="text-base font-semibold mb-4 pb-3 border-b border-border">
        Quotation Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quotation Number */}
        <div className="space-y-1">
          <TextInput
            name="quotationNumber"
            label="Quotation Number"
            placeholder="QT-2024-001"
            is_required={true}
          />
          {previousNumber && (
            <p className="text-xs text-muted-foreground px-1">
              Previous: {previousNumber}
            </p>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleGenerateNumber}
            className="text-xs h-7 mt-1"
          >
            Auto Generate
          </Button>
        </div>

        {/* Quotation Date */}
        <DatePickerInput
          name="quotationDate"
          label="Quotation Date"
          placeholder="Select date"
          is_required={true}
        />

        {/* Due Date */}
        <DatePickerInput
          name="dueDate"
          label="Due Date"
          placeholder="Select due date"
          is_required={true}
        />
      </div>

      {/* Custom Fields */}
      {fields.length > 0 && (
        <div className="mt-4 space-y-3">
          <div className="border-t border-border pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-3">Custom Fields</p>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <TextInput
                  name={`customFields.${index}.label`}
                  placeholder="Field Name"
                  label={index === 0 ? "Field Name" : ""}
                />
                <TextInput
                  name={`customFields.${index}.value`}
                  placeholder="Field Value"
                  label={index === 0 ? "Field Value" : ""}
                />
                <div className={`flex items-${index === 0 ? 'end' : 'center'}`}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Custom Field Button */}
      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddCustomField}
          className="text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Custom Field
        </Button>
      </div>
    </div>
  );
}
