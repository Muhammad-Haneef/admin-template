"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { ColorPickerInput } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Palette, Circle, ToggleLeft, AlertCircle } from "lucide-react";

const defaultValues = {
  basic: "#000000",
  preset: "#3357FF",
  disabled: "#FF5733",
  required: "",
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
              {JSON.stringify(watched, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ColorPickerShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Color Picker — Showcase & Guide</h1>
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
                    Default palette ke saath color picker. Hex string value.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorPickerInput name="basic" label="Pick Color" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; basic: "#000000" &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>string</code> — hex code e.g. <code>"#3B82F6"</code></p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 2. PRE-SELECTED */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Pre-selected Color</CardTitle>
                  <CardDescription>
                    Default value se pehle se selected color.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorPickerInput name="preset" label="Brand Color" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; preset: "#3357FF" &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>"#3357FF"</code> — ya user ne change kiya to naya hex</p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. CUSTOM PALETTE */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Custom Palette</CardTitle>
                  <CardDescription>
                    <code>colorsPalette</code> — apni colors ki list do.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorPickerInput
                    label="Theme Colors"
                    value="#10B981"
                    colorsPalette={[
                      "#EF4444", "#F97316", "#F59E0B",
                      "#10B981", "#3B82F6", "#8B5CF6",
                      "#EC4899", "#000000", "#6B7280", "#FFFFFF",
                    ]}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>colorsPalette=&#123;[...]&#125;</code> — custom hex array</p>
                    <p><strong>Data OUT:</strong> Same <code>string</code> hex value</p>
                    <p className="text-muted-foreground text-xs mt-2">Standalone — form ke bahar hai. Palette mein sirf yeh 10 colors dikhenge.</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 4. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled</code> — color change nahi hoga.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorPickerInput name="disabled" label="Locked Color" disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; disabled: "#FF5733" &#125;</code> + <code>disabled</code></p>
                    <p><strong>Data OUT:</strong> Value change nahi hogi — default color hi rahega</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. REQUIRED */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Required</CardTitle>
                  <CardDescription>
                    <code>is_required</code> — asterisk indicator.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorPickerInput
                    name="required"
                    label="Theme Color"
                    is_required
                    helperText="Pick a color for your theme"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>is_required</code> + <code>helperText="..."</code></p>
                    <p><strong>Data OUT:</strong> <code>string</code> — empty <code>""</code> ya hex code</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 6. ERROR */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Error State</CardTitle>
                  <CardDescription>
                    <code>error</code> — red border + error message.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorPickerInput
                    label="Color with Error"
                    error="Please select a valid color"
                    value="#ZZZZZZ"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>error="Please select a valid color"</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string</code> — error sirf UI</p>
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
                  <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}>
                    <Button type="submit">Submit Form</Button>
                  </form>
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Full Payload:</strong> <code>&#123; basic, preset, disabled, required &#125;</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Sab color values hex strings hain. Live payload right side dekho.</p>
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
