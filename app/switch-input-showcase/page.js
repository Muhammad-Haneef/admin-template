"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { SwitchInput } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, Shield, Lock } from "lucide-react";

const notificationOptions = [
  { id: "email", title: "Email Notifications", icon: Mail },
  { id: "push", title: "Push Notifications", icon: Bell },
  { id: "security", title: "Security Alerts", icon: Shield },
];

const featureOptions = [
  { id: "darkMode", title: "Dark Mode" },
  { id: "betaFeatures", title: "Beta Features" },
  { id: "analytics", title: "Usage Analytics" },
];

const defaultValues = {
  basic: 0,
  withIcon: 1,
  withStatus: 1,
  disabled: 1,
  required: 0,
  notifications: ["email"],
  features: [],
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

export default function SwitchInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Switch Input — Showcase & Guide</h1>
          <p className="text-muted-foreground mt-2">
            Toggle switch with label, icon, status label, tooltip, and more.
          </p>
        </div>

        <FormProvider {...form}>
          <div className="flex gap-8 items-start">
            <div className="flex-1 space-y-8 min-w-0">
              {/* 1. BASIC */}
              <Card>
                <CardHeader>
                  <CardTitle>1. Basic Usage (1/0)</CardTitle>
                  <CardDescription>
                    Simple on/off toggle — <code>1</code> / <code>0</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SwitchInput name="basic" label="Enable Notifications" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; basic: 0 &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>1</code> or <code>0</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 2. WITH ICON */}
              <Card>
                <CardHeader>
                  <CardTitle>2. With Icon</CardTitle>
                  <CardDescription>
                    <code>icon</code> prop — Lucide icon next to label.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SwitchInput name="withIcon" label="Email Alerts" icon={Mail} />
                  <SwitchInput name="_s1" label="Security Alerts" icon={Shield} />
                  <SwitchInput name="_s2" label="Push Notifications" icon={Bell} />
                  <SwitchInput name="_s3" label="Account Lock" icon={Lock} />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>icon=&#123;Mail&#125;</code> — UI only</p>
                    <p><strong>Data OUT:</strong> Same <code>1</code>/<code>0</code></p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 3. STATUS LABEL */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Status Label</CardTitle>
                  <CardDescription>
                    <code>showStatusLabel</code> + <code>statusLabels</code> — show On/Off text.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SwitchInput name="withStatus" label="Dark Mode" showStatusLabel statusLabels={{ on: "Enabled", off: "Disabled" }} />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; withStatus: 1 &#125;</code></p>
                    <p><strong>Data OUT:</strong> Same <code>1</code>/<code>0</code> — labels are UI only</p>
                  </div>
                </CardContent>
              </Card>

              {/* 4. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled=true</code> — user cannot toggle.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SwitchInput name="disabled" label="System Setting (locked)" disabled showStatusLabel />
                  <SwitchInput name="_d1" label="Unavailable Feature" disabled={false} showStatusLabel />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>disabled=&#123;true&#125;</code></p>
                    <p><strong>Data OUT:</strong> Value stays unchanged</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 5. REQUIRED */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Required</CardTitle>
                  <CardDescription>
                    <code>is_required</code> — red asterisk next to label.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SwitchInput name="required" label="Accept Terms" is_required />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>is_required</code> — UI only</p>
                    <p><strong>Data OUT:</strong> Same <code>1</code>/<code>0</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 6. ERROR */}
              <Card>
                <CardHeader>
                  <CardTitle>6. Error State</CardTitle>
                  <CardDescription>
                    <code>error</code> — red message below toggle.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SwitchInput name="_error1" label="Feature Toggle" error="This field is required" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>error="This field is required"</code></p>
                    <p><strong>Data OUT:</strong> Same <code>1</code>/<code>0</code> — error is UI only</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 7. ARRAY MODE */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Array Mode (options)</CardTitle>
                  <CardDescription>
                    <code>options</code> array — <code>[&#123; id, title &#125;]</code>. Toggle karne pe <code>id</code> array mein add/remove hoti hai.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-3">Notifications (default: ["email"])</p>
                    <SwitchInput name="notifications" options={notificationOptions} />
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Features (default: [])</p>
                    <SwitchInput name="features" options={featureOptions} />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; notifications: ["email"] &#125;</code></p>
                    <p><strong>Data OUT:</strong> Array — <code>["email", "push"]</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Options: <code>[&#123; id: "email", title: "Email Notifications" &#125;, ...]</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 8. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Form Integration</CardTitle>
                  <CardDescription>
                    All switches in a single form — watch live payload on the right.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SwitchInput name="basic" label="Notifications" />
                  <SwitchInput name="withIcon" label="Email Alerts" icon={Mail} />
                  <SwitchInput name="withStatus" label="Dark Mode" showStatusLabel />
                  <SwitchInput name="disabled" label="System Lock" disabled />
                  <SwitchInput name="required" label="Terms" is_required />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Format:</strong> Each field stores <code>1</code> or <code>0</code></p>
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
