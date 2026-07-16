"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { FileUpload } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Upload, Image, FileText, HardDrive, Layers } from "lucide-react";

const defaultValues = {
  basic: [],
  multiple: [],
  images: [],
  documents: [],
};

function LiveJsonPanel() {
  const { watch } = useFormContext();
  const watched = watch();
  return (
    <div className="w-80 shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-4">
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Default Values</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-64">
              {JSON.stringify(defaultValues, null, 2)}
            </pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-sm">Live Payload</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-lg overflow-auto max-h-64">
              {JSON.stringify(
                watched,
                (key, val) => {
                  if (val instanceof File) return `[File: ${val.name}]`;
                  return val;
                },
                2
              )}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function FileUploadShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">File Upload — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            Har example mein aik feature. Right side pe live JSON dekho.
          </p>
        </div>

        <FormProvider {...form}>
          <div className="flex gap-8 items-start">
            <div className="flex-1 space-y-8 min-w-0">

              {/* 1. BASIC SINGLE */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Basic (Single File)</CardTitle>
                  <CardDescription>
                    Single file upload — default <code>multiple=false</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload name="basic" label="Upload File" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; basic: [] &#125;</code> (empty array default)</p>
                    <p><strong>Data OUT:</strong> <code>File[]</code> — array with one File object</p>
                    <p className="text-muted-foreground text-xs mt-2">Note: Default hamesha <code>[]</code> hota hai. Upload hone pe <code>[File]</code> mein convert hota hai.</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 2. MULTIPLE */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Multiple Files</CardTitle>
                  <CardDescription>
                    <code>multiple</code> — ek se zyada files select karo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload name="multiple" label="Upload Multiple" multiple />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; multiple: [] &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>File[]</code> — e.g. <code>[File1, File2, File3]</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. ACCEPT IMAGES ONLY */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Accept Images Only</CardTitle>
                  <CardDescription>
                    <code>accept</code> — sirf images allowed hain.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    name="images"
                    label="Upload Images"
                    multiple
                    accept="image/*"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>accept="image/*"</code> + <code>multiple</code></p>
                    <p><strong>Data OUT:</strong> <code>File[]</code> — sirf image File objects</p>
                    <p className="text-muted-foreground text-xs mt-2">File dialog mein sirf images dikhenge. User ko other files nahi milengi.</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 4. MAX SIZE */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Max Size</CardTitle>
                  <CardDescription>
                    <code>maxSize</code> — file size limit in bytes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    label="Max 2MB Files"
                    accept="*"
                    maxSize={2 * 1024 * 1024}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>maxSize=&#123;2 * 1024 * 1024&#125;</code> = 2MB</p>
                    <p><strong>Data OUT:</strong> Error agar file 2MB se badi ho</p>
                    <p className="text-muted-foreground text-xs mt-2">maxSize mein bytes mein value do. Yeh standalone hai — form ke bahar.</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. MAX FILES */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Max Files</CardTitle>
                  <CardDescription>
                    <code>maxFiles</code> — kitni files max upload ho sakti hain.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    label="Max 3 Documents"
                    multiple
                    maxFiles={3}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>maxFiles=&#123;3&#125;</code> + <code>accept=".pdf,.doc,.docx,.txt"</code></p>
                    <p><strong>Data OUT:</strong> <code>File[]</code> — max 3 elements</p>
                    <p className="text-muted-foreground text-xs mt-2">3 files select hone ke baad error ayega: "Maximum 3 files allowed."</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 6. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled</code> — upload disabled.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    label="Disabled Upload"
                    disabled
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>disabled</code></p>
                    <p><strong>Data OUT:</strong> Value change nahi hogi</p>
                  </div>
                </CardContent>
              </Card>

              {/* 7. REQUIRED */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Required</CardTitle>
                  <CardDescription>
                    <code>is_required</code> — asterisk + <code>helperText</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    label="Required Upload"
                    is_required
                    helperText="Please upload a required document"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>is_required</code> + <code>helperText="..."</code></p>
                    <p><strong>Data OUT:</strong> Same <code>File[]</code> — asterisk sirf UI</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 8. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Form Integration</CardTitle>
                  <CardDescription>
                    Sab fields form ke andar. Submit karo aur payload dekho.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit((data) => {
                    const summary = {};
                    Object.entries(data).forEach(([key, val]) => {
                      summary[key] = Array.isArray(val) ? val.map(f => f?.name || f) : val;
                    });
                    alert(JSON.stringify(summary, null, 2));
                  })}>
                    <Button type="submit">Submit Form</Button>
                  </form>
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Full Payload:</strong> <code>&#123; basic, multiple, images, documents &#125;</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Saare file arrays form state mein track hote hain. Live payload right side dekho.</p>
                  </div>
                </CardContent>
              </Card>

            </div>

            <LiveJsonPanel />
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
