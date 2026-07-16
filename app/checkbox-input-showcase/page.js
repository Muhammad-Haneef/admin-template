"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { CheckboxInput } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, Shield, Lock } from "lucide-react";

const permissionOptions = [
  { id: "read", title: "Read" },
  { id: "write", title: "Write" },
  { id: "delete", title: "Delete" },
  { id: "admin", title: "Admin" },
];

const roleOptions = [
  { id: "viewer", title: "Viewer" },
  { id: "editor", title: "Editor" },
  { id: "admin", title: "Admin" },
];

const defaultValues = {
  terms: 0,
  newsletter: 1,
  notifications: 0,
  withIcon: 0,
  withTooltip: 0,
  disabledChecked: 1,
  disabledEmpty: 0,
  requiredField: 0,
  permissions: ["read"],
  roles: [],
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

export default function CheckboxInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Checkbox Input — Showcase & Guide</h1>
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
                <CardTitle>1. Basic Usage (1/0)</CardTitle>
                <CardDescription>
                  Simple checkbox — <code>1</code> / <code>0</code>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CheckboxInput name="terms" title="I agree to the Terms & Conditions" />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>&#123; terms: 0 &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>1</code> ya <code>0</code></p>
                </div>
              </CardContent>
            </Card>

            {/* 2. DEFAULT VALUES */}
            <Card>
              <CardHeader>
                <CardTitle>2. Default Values</CardTitle>
                <CardDescription>
                  <code>1</code> do to pehle se checked, <code>0</code> se unchecked.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">Pre-checked (1)</p>
                  <CheckboxInput name="newsletter" title="Subscribe to newsletter" />
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-3">Unchecked (0)</p>
                  <CheckboxInput name="notifications" title="Enable push notifications" />
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>&#123; newsletter: 1, notifications: 0 &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>1</code> ya <code>0</code></p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 3. WITH ICON */}
            <Card>
              <CardHeader>
                <CardTitle>3. With Icon</CardTitle>
                <CardDescription>
                  <code>icon</code> prop — Lucide icon label ke saath.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CheckboxInput name="withIcon" icon={Bell} title="Enable Notifications" />
                <CheckboxInput name="_m2" icon={Mail} title="Email Alerts" defaultChecked />
                <CheckboxInput name="_m3" icon={Shield} title="Two-Factor Auth" />
                <CheckboxInput name="_m4" icon={Lock} title="Lock Account" />
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>icon=&#123;Bell&#125;</code> — sirf UI</p>
                  <p><strong>Data OUT:</strong> Same <code>1</code>/<code>0</code></p>
                </div>
              </CardContent>
            </Card>

            {/* 4. TOOLTIP */}
            <Card>
              <CardHeader>
                <CardTitle>4. Tooltip</CardTitle>
                <CardDescription>
                  <code>tooltip</code> — info icon hover pe text.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CheckboxInput
                  name="withTooltip"
                  title="Enable advanced security"
                  tooltip="This will enable 2FA and session timeout"
                />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>tooltip="..."</code> — sirf UI</p>
                  <p><strong>Data OUT:</strong> Same <code>1</code>/<code>0</code></p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 5. DISABLED */}
            <Card>
              <CardHeader>
                <CardTitle>5. Disabled</CardTitle>
                <CardDescription>
                  <code>disabled=true</code> — change nahi hoga.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">Disabled + Checked</p>
                  <CheckboxInput name="disabledChecked" title="Admin permission (locked)" disabled />
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-3">Disabled + Unchecked</p>
                  <CheckboxInput name="disabledEmpty" title="Unavailable option" disabled />
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>disabled=&#123;true&#125;</code></p>
                  <p><strong>Data OUT:</strong> Value change nahi hogi</p>
                </div>
              </CardContent>
            </Card>

            {/* 6. ERROR + REQUIRED */}
            <Card>
              <CardHeader>
                <CardTitle>6. Error + Required</CardTitle>
                <CardDescription>
                  <code>error</code> — red text. <code>is_required</code> — asterisk.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CheckboxInput
                  name="requiredField"
                  title="You must accept the terms"
                  is_required
                  error="Please accept the terms to continue"
                />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>is_required</code> + <code>error="..."</code></p>
                  <p><strong>Data OUT:</strong> Same <code>1</code>/<code>0</code> — error sirf UI</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 7. ARRAY MODE */}
            <Card>
              <CardHeader>
                <CardTitle>7. Array Mode (options)</CardTitle>
                <CardDescription>
                  <code>options</code> array do — <code>[&#123; id, title &#125;]</code>. Checked hui to <code>id</code> array mein jayegi.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-3">Permissions (default: ["read"])</p>
                  <CheckboxInput name="permissions" options={permissionOptions} />
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-3">Roles (default: [])</p>
                  <CheckboxInput name="roles" options={roleOptions} />
                </div>
                <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>&#123; permissions: ["read"] &#125;</code></p>
                  <p><strong>Data OUT:</strong> Array — <code>["read", "write"]</code></p>
                  <p className="text-muted-foreground text-xs mt-2">Options: <code>[&#123; id: "read", title: "Read" &#125;, ...]</code></p>
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
