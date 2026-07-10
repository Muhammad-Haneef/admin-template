"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RichTextEditor, TextInput } from "@/components/FormElements";
import { Button } from "@/components/ui/button";
import { Plus, X, FileText, Info } from "lucide-react";

export function AdditionalNotes() {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <h3 className="text-base font-semibold mb-4 pb-3 border-b border-border flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Additional Notes
      </h3>
      <RichTextEditor
        name="additionalNotes"
        placeholder="Enter any additional notes or special instructions..."
        height={200}
      />
    </div>
  );
}

export function AdditionalInfo() {
  const { control } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalInfo"
  });

  const handleAddField = () => {
    append({
      label: "",
      value: ""
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Additional Information
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddField}
          className="text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Field
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground">
          <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No additional information</p>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={handleAddField}
            className="mt-2 text-xs"
          >
            Add Custom Field
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <TextInput
                name={`additionalInfo.${index}.label`}
                placeholder="Field Name"
              />
              <div className="flex gap-2">
                <TextInput
                  name={`additionalInfo.${index}.value`}
                  placeholder="Field Value"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-destructive hover:text-destructive shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {fields.length > 0 && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddField}
          className="w-full mt-4 border-dashed text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Another Field
        </Button>
      )}
    </div>
  );
}
