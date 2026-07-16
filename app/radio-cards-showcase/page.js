"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { RadioCards } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Zap, Code, Shield, Globe, Palette, Rocket } from "lucide-react";

const planOptions = [
  { id: "free", title: "Free", description: "Basic" },
  { id: "pro", title: "Pro", description: "Advanced" },
  { id: "enterprise", title: "Enterprise", description: "Custom" },
];

const featureOptions = [
  { id: "zap", title: "Lightning", description: "Fast performance", icon: <Zap className="w-5 h-5" /> },
  { id: "code", title: "Developer", description: "API access", icon: <Code className="w-5 h-5" /> },
  { id: "shield", title: "Security", description: "Advanced protection", icon: <Shield className="w-5 h-5" /> },
  { id: "globe", title: "Global", description: "Worldwide CDN", icon: <Globe className="w-5 h-5" /> },
  { id: "palette", title: "Theming", description: "Custom branding", icon: <Palette className="w-5 h-5" /> },
  { id: "rocket", title: "Performance", description: "Optimized speed", icon: <Rocket className="w-5 h-5" /> },
];

const defaultValues = {
  basic: "",
  withIcon: "",
  columns1: "",
  columns3: "",
  disabled: "free",
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

export default function RadioCardsShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Radio Cards — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            Card-based radio selection with icons, columns, descriptions, and more.
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
                    Simple card selection — stores the chosen <code>id</code> string.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioCards name="basic" label="Select Plan" options={planOptions} columns={3} showIcon={false} />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>{'{ basic: "" }'}</code></p>
                    <p><strong>Data OUT:</strong> <code>"free"</code> | <code>"pro"</code> | <code>"enterprise"</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 2. WITH ICONS */}
              <Card>
                <CardHeader>
                  <CardTitle>2. With Icons</CardTitle>
                  <CardDescription>
                    <code>showIcon=true</code> — display icon from each option.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioCards name="withIcon" label="Choose Feature" options={featureOptions} columns={3} showDescription />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>options</code> with <code>icon</code> field</p>
                    <p><strong>Data OUT:</strong> Option id string</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 3. COLUMNS */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Columns</CardTitle>
                  <CardDescription>
                    <code>columns</code> prop — <code>1</code> to <code>4</code> columns.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-3">1 Column</p>
                    <RadioCards name="columns1" options={planOptions} columns={1} showIcon={false} />
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">3 Columns</p>
                    <RadioCards name="columns3" options={planOptions} columns={3} showIcon={false} />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>columns=1</code> or <code>columns=3</code></p>
                    <p><strong>Data OUT:</strong> Same string — layout sirf UI</p>
                  </div>
                </CardContent>
              </Card>

              {/* 4. SHOW/HIDE DESCRIPTION */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Show/Hide Description</CardTitle>
                  <CardDescription>
                    <code>showDescription</code> — toggle description visibility.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-3">With Description (default)</p>
                    <RadioCards name="_desc1" label="Plan" options={planOptions} columns={3} showDescription showIcon={false} />
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Without Description</p>
                    <RadioCards name="_desc2" label="Plan" options={planOptions} columns={3} showDescription={false} showIcon={false} />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>showDescription={'{true}'}</code> or <code>{'\{false}'}</code></p>
                    <p><strong>Data OUT:</strong> Same — UI only</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 5. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled=true</code> — no interaction allowed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioCards name="disabled" label="Plan (locked)" options={planOptions} columns={3} disabled showIcon={false} />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>disabled={'{true}'}</code> + default <code>"free"</code></p>
                    <p><strong>Data OUT:</strong> Value stays <code>"free"</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 6. REQUIRED */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Required</CardTitle>
                  <CardDescription>
                    <code>is_required</code> — asterisk on label.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioCards name="required" label="Select Plan (Required)" options={planOptions} columns={3} is_required showIcon={false} />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>is_required</code> — UI only</p>
                    <p><strong>Data OUT:</strong> Selected value string</p>
                  </div>
                </CardContent>
              </Card>

              {/* 7. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Form Integration</CardTitle>
                  <CardDescription>
                    All fields in one form — watch payload on the right.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioCards name="basic" label="Basic" options={planOptions} columns={3} showIcon={false} />
                  <RadioCards name="withIcon" label="With Icons" options={featureOptions} columns={3} />
                  <RadioCards name="disabled" label="Disabled" options={planOptions} columns={3} disabled showIcon={false} />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Format:</strong> Each field stores the selected option's <code>id</code> string</p>
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
