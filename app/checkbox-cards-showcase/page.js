"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { CheckboxCards } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Zap, Globe, Palette, Shield, Rocket, Code } from "lucide-react";

const planOptions = [
  { id: "free", title: "Free", description: "Basic features for personal use" },
  { id: "pro", title: "Pro", description: "Advanced features for professionals" },
  { id: "enterprise", title: "Enterprise", description: "Custom solutions for teams" },
];

const featureOptions = [
  { id: "analytics", title: "Analytics", description: "Track your performance", icon: <Zap className="w-5 h-5" /> },
  { id: "api", title: "API Access", description: "Integrate with other tools", icon: <Code className="w-5 h-5" /> },
  { id: "support", title: "Priority Support", description: "24/7 customer service", icon: <Shield className="w-5 h-5" /> },
  { id: "cdn", title: "Global CDN", description: "Fast content delivery", icon: <Globe className="w-5 h-5" /> },
  { id: "design", title: "Custom Design", description: "Branded experience", icon: <Palette className="w-5 h-5" /> },
  { id: "deploy", title: "Auto Deploy", description: "One-click deployments", icon: <Rocket className="w-5 h-5" /> },
];

const colorOptions = [
  { id: "red", title: "Red" },
  { id: "blue", title: "Blue" },
  { id: "green", title: "Green" },
  { id: "yellow", title: "Yellow" },
  { id: "purple", title: "Purple" },
  { id: "pink", title: "Pink" },
];

const defaultValues = {
  basic: [],
  withIcons: [],
  columns1: [],
  columns3: [],
  maxSelect: [],
  withDesc: [],
  noDesc: [],
  disabledField: ["free"],
  requiredField: [],
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

export default function CheckboxCardsShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkbox Cards — Showcase & Guide</h1>
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
                <CardDescription><code>options</code> array mein <code>id</code> + <code>title</code> do.</CardDescription>
              </CardHeader>
              <CardContent>
                <CheckboxCards name="basic" title="Choose Plan" options={planOptions} columns={3} helperText="Multiple selections allowed" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>options=&#123;[&#123; id, title, description &#125;]&#125;</code></p>
                  <p><strong>Data OUT:</strong> Array — <code>["free", "pro"]</code></p>
                </div>
              </CardContent>
            </Card>

            {/* 2. WITH ICONS */}
            <Card>
              <CardHeader>
                <CardTitle>2. With Icons</CardTitle>
                <CardDescription>Option mein <code>icon</code> do — Lucide JSX.</CardDescription>
              </CardHeader>
              <CardContent>
                <CheckboxCards name="withIcons" title="Select Features" options={featureOptions} columns={2} helperText="Icons optional" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data OUT:</strong> <code>["analytics", "api"]</code> — sirf id values</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 3. COLUMNS */}
            <Card>
              <CardHeader>
                <CardTitle>3. Columns</CardTitle>
                <CardDescription><code>columns</code>: 1, 2, 3, 4.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-3">1 Column</p>
                  <CheckboxCards name="columns1" options={planOptions} columns={1} />
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-3">3 Columns</p>
                  <CheckboxCards name="columns3" options={colorOptions} columns={3} />
                </div>
              </CardContent>
            </Card>

            {/* 4. MAX SELECTIONS */}
            <Card>
              <CardHeader>
                <CardTitle>4. Max Selections</CardTitle>
                <CardDescription><code>max</code> — limit lagao.</CardDescription>
              </CardHeader>
              <CardContent>
                <CheckboxCards name="maxSelect" title="Pick Up To 2" options={featureOptions} columns={3} max={2} helperText="2 select hone pe baaki disable" />
              </CardContent>
            </Card>

            <Separator />

            {/* 5. SHOW/HIDE DESCRIPTION */}
            <Card>
              <CardHeader>
                <CardTitle>5. Show / Hide Description</CardTitle>
                <CardDescription><code>showDescription</code></CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sm font-medium mb-3">With Description</p>
                  <CheckboxCards name="withDesc" options={featureOptions.slice(0, 3)} columns={3} showDescription />
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-3">Without Description</p>
                  <CheckboxCards name="noDesc" options={featureOptions.slice(0, 3)} columns={3} showDescription={false} />
                </div>
              </CardContent>
            </Card>

            {/* 6. DISABLED */}
            <Card>
              <CardHeader>
                <CardTitle>6. Disabled</CardTitle>
                <CardDescription><code>disabled=true</code> — sab disable.</CardDescription>
              </CardHeader>
              <CardContent>
                <CheckboxCards name="disabledField" title="Locked" options={planOptions} columns={3} disabled helperText="Click nahi kar sakte" />
              </CardContent>
            </Card>

            {/* 7. ERROR + REQUIRED */}
            <Card>
              <CardHeader>
                <CardTitle>7. Error + Required</CardTitle>
                <CardDescription><code>error</code> + <code>is_required</code></CardDescription>
              </CardHeader>
              <CardContent>
                <CheckboxCards name="requiredField" title="Select At Least One" options={planOptions} columns={3} is_required error="At least one option required" />
              </CardContent>
            </Card>

            {/* 8. DEFAULT VALUES */}
            <Card>
              <CardHeader>
                <CardTitle>8. Default Values</CardTitle>
                <CardDescription><code>defaultValues</code> mein ID array do.</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-3 rounded-lg text-xs mb-4">{`useForm({
  defaultValues: {
    features: ["analytics", "api"]  // pre-selected
  },
})`}</pre>
                <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>IDs ka array do:</strong> <code>["analytics", "api"]</code></p>
                  <p><strong>Empty:</strong> <code>[]</code></p>
                  <p className="text-muted-foreground text-xs mt-2">Note: IDs <code>id</code> field se match honi chahiyein.</p>
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
