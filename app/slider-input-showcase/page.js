"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { SliderInput } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sliders, DollarSign, Percent, Zap, ToggleLeft } from "lucide-react";

const defaultValues = {
  basic: 50,
  withRange: [20, 80],
  withPrefix: 50,
  withStep: 0,
  disabled: 75,
  required: 0,
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

export default function SliderInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Slider Input — Showcase & Guide</h1>
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
                    Simple slider — single number value.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SliderInput name="basic" label="Volume" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; basic: 50 &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>number</code> — e.g. <code>50</code></p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 2. RANGE MODE */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Range Mode</CardTitle>
                  <CardDescription>
                    <code>rangeMode</code> — dual handle, value is <code>[min, max]</code> array.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SliderInput
                    name="withRange"
                    label="Price Range"
                    rangeMode
                    min={0}
                    max={100}
                    prefix="$"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; withRange: [20, 80] &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>[number, number]</code> — e.g. <code>[20, 80]</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Note: Range mode mein value array hota hai, single number nahi.</p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. PREFIX / SUFFIX */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Prefix / Suffix</CardTitle>
                  <CardDescription>
                    <code>prefix</code> &amp; <code>suffix</code> — label value ke saath.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-3">Prefix: $</p>
                    <SliderInput
                      name="withPrefix"
                      label="Price"
                      prefix="$"
                      min={0}
                      max={200}
                    />
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Suffix: %</p>
                    <SliderInput
                      label="Discount"
                      value={35}
                      suffix="%"
                      min={0}
                      max={100}
                    />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>prefix="$"</code> + <code>suffix="%"</code> — sirf UI display</p>
                    <p><strong>Data OUT:</strong> Same <code>number</code> — prefix/suffix form value mein nahi aata</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 4. CUSTOM STEP */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Custom Step</CardTitle>
                  <CardDescription>
                    <code>step</code> — kitne step mein value badhegi.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SliderInput
                    name="withStep"
                    label="Brightness"
                    step={5}
                    min={0}
                    max={100}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; withStep: 0 &#125;</code> + <code>step=&#123;5&#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>number</code> — multiples of 5 (0, 5, 10, 15 ...)</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. MIN / MAX */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Min / Max</CardTitle>
                  <CardDescription>
                    <code>min</code> &amp; <code>max</code> — custom range boundaries.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SliderInput
                    label="Temperature"
                    value={22}
                    min={-10}
                    max={50}
                    suffix="°C"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>min=&#123;-10&#125;</code> + <code>max=&#123;50&#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>number</code> — value between -10 and 50</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 6. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled</code> — slider change nahi hoga.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SliderInput name="disabled" label="Locked Value" disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; disabled: 75 &#125;</code> + <code>disabled</code></p>
                    <p><strong>Data OUT:</strong> Value change nahi hogi — default 75 hi rahega</p>
                  </div>
                </CardContent>
              </Card>

              {/* 7. REQUIRED */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Required</CardTitle>
                  <CardDescription>
                    <code>is_required</code> — asterisk + <code>helperText</code> for guidance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SliderInput
                    name="required"
                    label="Rating"
                    is_required
                    helperText="Select a rating between 0 and 100"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>is_required</code> + <code>helperText="..."</code></p>
                    <p><strong>Data OUT:</strong> Same <code>number</code> — asterisk sirf UI hai</p>
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
                  <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))}>
                    <Button type="submit">Submit Form</Button>
                  </form>
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Full Payload:</strong> <code>&#123; basic, withRange, withPrefix, withStep, disabled, required &#125;</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Saare slider values form state mein track hote hain. Live payload right side dekho.</p>
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
