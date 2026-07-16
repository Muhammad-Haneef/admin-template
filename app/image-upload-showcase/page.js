"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { ImageUpload } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Image, Square, RectangleHorizontal, RectangleVertical } from "lucide-react";

const defaultValues = {
  basic: null,
  square: null,
  video: null,
  disabled: null,
  required: null,
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
                  if (typeof val === "string" && val.startsWith("data:")) return "[Base64 Image Data]";
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

export default function ImageUploadShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Image Upload — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            Har example mein aik feature. Right side pe live JSON dekho.
          </p>
        </div>

        <FormProvider {...form}>
          <div className="flex gap-8 items-start">
            <div className="flex-1 space-y-8 min-w-0">

              {/* 1. BASIC */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Basic Usage</CardTitle>
                  <CardDescription>
                    Default square aspect ratio. Value is base64 string or null.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUpload name="basic" label="Profile Photo" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; basic: null &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>string | null</code> — base64 data URL ya <code>null</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Note: Image select karne pe value <code>"data:image/png;base64,..."</code> hoti hai. Default <code>null</code> hota hai.</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 2. ASPECT RATIOS */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Aspect Ratios</CardTitle>
                  <CardDescription>
                    <code>aspectRatio</code> — square, video, portrait, landscape.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-3">Square (1:1)</p>
                    <ImageUpload
                      name="square"
                      label="Square Image"
                      aspectRatio="square"
                    />
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Video (16:9)</p>
                    <ImageUpload
                      name="video"
                      label="Video Thumbnail"
                      aspectRatio="video"
                    />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>aspectRatio="square"</code> / <code>"video"</code> / <code>"portrait"</code> / <code>"landscape"</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string | null</code> — aspect ratio sirf UI layout hai</p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. MAX SIZE */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Max Size</CardTitle>
                  <CardDescription>
                    <code>maxSize</code> — file size limit in bytes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    label="Max 2MB Image"
                    maxSize={2 * 1024 * 1024}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>maxSize=&#123;2 * 1024 * 1024&#125;</code> = 2MB</p>
                    <p><strong>Data OUT:</strong> Error agar image 2MB se badi ho</p>
                    <p className="text-muted-foreground text-xs mt-2">Default 5MB hai. Yeh standalone — form ke bahar.</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 4. ALLOW ZOOM */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Allow Zoom</CardTitle>
                  <CardDescription>
                    <code>allowZoom</code> — preview pe zoom button dikhega.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    label="Zoomable Image"
                    allowZoom
                    aspectRatio="landscape"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>allowZoom=&#123;true&#125;</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string | null</code> — zoom sirf UI feature hai</p>
                    <p className="text-muted-foreground text-xs mt-2">Image upload hone pe hover pe zoom icon dikhayi dega. Click pe full size modal.</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled</code> — upload change nahi hoga.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUpload name="disabled" label="Locked Image" disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; disabled: null &#125;</code> + <code>disabled</code></p>
                    <p><strong>Data OUT:</strong> Value change nahi hogi</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 6. REQUIRED */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Required</CardTitle>
                  <CardDescription>
                    <code>is_required</code> — asterisk + <code>helperText</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUpload
                    name="required"
                    label="Avatar"
                    is_required
                    helperText="Please upload a profile picture"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>is_required</code> + <code>helperText="..."</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string | null</code> — asterisk sirf UI</p>
                  </div>
                </CardContent>
              </Card>

              {/* 7. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Form Integration</CardTitle>
                  <CardDescription>
                    Sab fields form ke andar. Submit karo aur payload dekho.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit((data) => {
                    const summary = {};
                    Object.entries(data).forEach(([key, val]) => {
                      summary[key] = val ? "[Base64 Image]" : null;
                    });
                    alert(JSON.stringify(summary, null, 2));
                  })}>
                    <Button type="submit">Submit Form</Button>
                  </form>
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Full Payload:</strong> <code>&#123; basic, square, video, disabled, required &#125;</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Sab values base64 strings ya null hain. Live payload right side dekho.</p>
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
