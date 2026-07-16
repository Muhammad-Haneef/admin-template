"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { MultiImageUpload } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Images, Grid3X3, ToggleLeft, GripVertical } from "lucide-react";

const defaultValues = {
  basic: [],
  withCount: [],
  maxThree: [],
  disabled: [],
  required: [],
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
                  if (Array.isArray(val)) return val.map((v) => typeof v === "string" && v.startsWith("data:") ? "[Base64 Image]" : v);
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

export default function MultiImageUploadShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Multi Image Upload — Showcase & Guide</h1>
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
                    Multiple images upload — value is <code>string[]</code> of base64 data URLs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MultiImageUpload name="basic" label="Gallery Photos" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; basic: [] &#125;</code> (empty array)</p>
                    <p><strong>Data OUT:</strong> <code>string[]</code> — e.g. <code>["data:image/png;base64,...", "data:image/jpg;base64,..."]</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Note: Default hamesha <code>[]</code> hota hai. Images upload hone pe base64 strings array mein add hoti hain.</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 2. SHOW COUNT */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Show Count</CardTitle>
                  <CardDescription>
                    <code>showCount</code> — label ke saath count dikhega.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MultiImageUpload
                    name="withCount"
                    label="Product Images"
                    showCount
                    maxImages={5}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>showCount</code> + <code>maxImages=&#123;5&#125;</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string[]</code> — count sirf UI label hai</p>
                    <p className="text-muted-foreground text-xs mt-2">Upload hone pe right side dikhega: "2 / 5 images"</p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. MAX IMAGES */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Max Images</CardTitle>
                  <CardDescription>
                    <code>maxImages</code> — kitni images max upload ho sakti hain.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MultiImageUpload
                    name="maxThree"
                    label="Max 3 Photos"
                    maxImages={3}
                    showCount
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>maxImages=&#123;3&#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>string[]</code> — max 3 elements</p>
                    <p className="text-muted-foreground text-xs mt-2">3 images hone ke baad upload area gayab ho jayega. Error: "Maximum 3 images allowed"</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 4. GRID COLUMNS */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Grid Columns</CardTitle>
                  <CardDescription>
                    <code>gridCols</code> — kitne columns mein grid dikhega.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MultiImageUpload
                    label="4 Column Grid"
                    gridCols={4}
                    maxImages={8}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>gridCols=&#123;4&#125;</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string[]</code> — gridCols sirf UI layout hai</p>
                    <p className="text-muted-foreground text-xs mt-2">Default 3 columns hai. 2, 3, 4, ya 6 columns use kar sakte ho.</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. ALLOW REORDER */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Allow Reorder</CardTitle>
                  <CardDescription>
                    <code>allowReorder</code> — drag karke images ki order change karo.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MultiImageUpload
                    label="Reorderable Gallery"
                    allowReorder
                    gridCols={3}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>allowReorder=&#123;true&#125;</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string[]</code> — order change hoga drag se</p>
                    <p className="text-muted-foreground text-xs mt-2">Image pe hover karo, move icon dikhega. Drag karke nayi position pe chhodo.</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 6. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled</code> — upload/change disabled.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MultiImageUpload name="disabled" label="Locked Images" disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; disabled: [] &#125;</code> + <code>disabled</code></p>
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
                  <MultiImageUpload
                    name="required"
                    label="Gallery"
                    is_required
                    helperText="Please upload at least one image"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>is_required</code> + <code>helperText="..."</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string[]</code> — asterisk sirf UI</p>
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
                      summary[key] = Array.isArray(val) ? val.map((v) => v?.startsWith?.("data:") ? "[Base64 Image]" : v) : val;
                    });
                    alert(JSON.stringify(summary, null, 2));
                  })}>
                    <Button type="submit">Submit Form</Button>
                  </form>
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Full Payload:</strong> <code>&#123; basic, withCount, maxThree, disabled, required &#125;</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Sab arrays of base64 strings hain. Live payload right side dekho.</p>
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
