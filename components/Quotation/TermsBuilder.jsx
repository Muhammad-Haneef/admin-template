"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TextareaInput, TextInput } from "@/components/FormElements";
import { Plus, GripVertical, Copy, Trash2, FileText } from "lucide-react";

export default function TermsBuilder() {
  const { control } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "terms"
  });

  const handleAddTerm = () => {
    append({
      title: "",
      content: ""
    });
  };

  const handleDuplicate = (index) => {
    const term = fields[index];
    append({
      ...term,
      title: `${term.title} (Copy)`
    });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Terms and Conditions
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddTerm}
          className="text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Term
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-lg">
          <FileText className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No terms added yet</p>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={handleAddTerm}
            className="mt-2 text-xs"
          >
            Add First Term
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border border-border rounded-lg p-4 bg-background hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start gap-3">
                {/* Drag Handle */}
                <button
                  type="button"
                  className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground mt-2"
                >
                  <GripVertical className="w-4 h-4" />
                </button>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <TextInput
                    name={`terms.${index}.title`}
                    placeholder="Term title (e.g., Payment Terms)"
                  />
                  <TextareaInput
                    name={`terms.${index}.content`}
                    placeholder="Enter term description..."
                    rows={3}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDuplicate(index)}
                    className="h-8 w-8"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
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
          onClick={handleAddTerm}
          className="w-full mt-4 border-dashed"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Another Term
        </Button>
      )}
    </div>
  );
}
