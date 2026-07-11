"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Paperclip, X, Download, FileIcon } from "lucide-react";

export default function AttachmentUploader() {
  const { control, setValue, watch } = useFormContext();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attachments"
  });

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      // Check file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        append({
          name: file.name,
          size: file.size,
          type: file.type,
          data: reader.result,
          preview: file.type.startsWith('image/') ? reader.result : null
        });
      };
      reader.readAsDataURL(file);
    });
    
    // Reset input
    e.target.value = '';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDownload = (attachment) => {
    const link = document.createElement('a');
    link.href = attachment.data;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Paperclip className="w-5 h-5 text-primary" />
          Attachments
        </h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => document.getElementById("attachment-upload")?.click()}
          className="text-xs"
        >
          <Paperclip className="w-3 h-3 mr-1" />
          Add Files
        </Button>
      </div>

      <input
        id="attachment-upload"
        type="file"
        multiple
        onChange={handleFileUpload}
        className="hidden"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
      />

      {fields.length === 0 ? (
        <div 
          onClick={() => document.getElementById("attachment-upload")?.click()}
          className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary hover:bg-muted/30 transition-colors"
        >
          <Paperclip className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No attachments added</p>
          <p className="text-xs mt-1">Maximum file size: 10MB</p>
          <p className="text-xs text-primary mt-2">Click to upload files</p>
        </div>
      ) : (
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex items-center justify-between p-3 border border-border rounded-lg bg-background hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {field.preview ? (
                  <div className="w-12 h-12 rounded border border-border overflow-hidden shrink-0 bg-white">
                    <img 
                      src={field.preview} 
                      alt={field.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <FileIcon className="w-5 h-5 text-muted-foreground shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{field.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(field.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(field)}
                  className="h-8 w-8"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  title="Remove"
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
          onClick={() => document.getElementById("attachment-upload")?.click()}
          className="w-full mt-4 border-dashed text-xs"
        >
          <Paperclip className="w-3 h-3 mr-1" />
          Add More Files
        </Button>
      )}
    </div>
  );
}
