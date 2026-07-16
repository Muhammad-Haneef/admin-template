"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import RadioInput from "@/components/FormElements/radio-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Circle, Square, Triangle, Hexagon, Star, Zap, Shield, Eye } from "lucide-react";

const defaultValues = {
  basic: "small",
  withDesc: "",
  horizontal: "red",
  cardLayout: "",
  disabled: "a",
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

export default function RadioInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Radio Input — Showcase & Guide</h1>
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
                  Simple radio group — <code>string</code> value. Vertical layout default.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioInput
                  name="basic"
                  label="Size"
                  options={[
                    { id: "small", title: "Small" },
                    { id: "medium", title: "Medium" },
                    { id: "large", title: "Large" },
                  ]}
                />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                  <p><strong>Data IN:</strong> <code>&#123; basic: "small" &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>"medium"</code> (option id string)</p>
                  <p className="text-muted-foreground text-xs mt-2">Options: <code>[&#123; id: "small", title: "Small" &#125;, ...]</code></p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 2. WITH DESCRIPTION */}
            <Card>
              <CardHeader>
                <CardTitle>2. With Description</CardTitle>
                <CardDescription>
                  Har option mein <code>description</code> — extra text label ke neeche.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioInput
                  name="withDesc"
                  label="Plan"
                  options={[
                    { id: "free", title: "Free", description: "Basic features, limited usage" },
                    { id: "pro", title: "Pro", description: "All features, unlimited usage" },
                    { id: "enterprise", title: "Enterprise", description: "Custom pricing, dedicated support" },
                  ]}
                />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>description: "..."</code> — sirf UI</p>
                  <p><strong>Data OUT:</strong> Same string — <code>"free"</code>, <code>"pro"</code>, ya <code>"enterprise"</code></p>
                </div>
              </CardContent>
            </Card>

            {/* 3. HORIZONTAL */}
            <Card>
              <CardHeader>
                <CardTitle>3. Horizontal</CardTitle>
                <CardDescription>
                  <code>orientation="horizontal"</code> — options ek line mein.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioInput
                  name="horizontal"
                  label="Color"
                  orientation="horizontal"
                  options={[
                    { id: "red", title: "Red" },
                    { id: "green", title: "Green" },
                    { id: "blue", title: "Blue" },
                  ]}
                />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>orientation="horizontal"</code></p>
                  <p><strong>Data OUT:</strong> Same string — layout sirf UI</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 4. CARD LAYOUT */}
            <Card>
              <CardHeader>
                <CardTitle>4. Card Layout</CardTitle>
                <CardDescription>
                  <code>layout="card"</code> — har option ek card jaisa dikhta hai. Icon + description ke saath.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioInput
                  name="cardLayout"
                  label="Security Level"
                  layout="card"
                  options={[
                    { id: "low", title: "Basic", description: "Password only", icon: <Shield className="h-4 w-4" /> },
                    { id: "medium", title: "Standard", description: "Password + 2FA", icon: <Eye className="h-4 w-4" /> },
                    { id: "high", title: "Maximum", description: "Password + 2FA + Biometric", icon: <Zap className="h-4 w-4" /> },
                  ]}
                />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>layout="card"</code> + <code>icon</code> + <code>description</code></p>
                  <p><strong>Data OUT:</strong> Same string — card sirf UI</p>
                </div>
              </CardContent>
            </Card>

            {/* 5. DISABLED */}
            <Card>
              <CardHeader>
                <CardTitle>5. Disabled</CardTitle>
                <CardDescription>
                  <code>disabled=true</code> — poori radio group band. Individual option: <code>disabled: true</code>.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioInput
                  name="disabled"
                  label="Disabled Group"
                  disabled
                  options={[
                    { id: "a", title: "Option A" },
                    { id: "b", title: "Option B" },
                    { id: "c", title: "Option C (disabled)", disabled: true },
                  ]}
                />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>disabled=&#123;true&#125;</code> + <code>defaultValues: &#123; disabled: "a" &#125;</code></p>
                  <p><strong>Data OUT:</strong> <code>"a"</code> — unchanged</p>
                </div>
              </CardContent>
            </Card>

            <Separator />

            {/* 6. REQUIRED */}
            <Card>
              <CardHeader>
                <CardTitle>6. Required</CardTitle>
                <CardDescription>
                  <code>is_required</code> — asterisk (*) label ke saath.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioInput
                  name="required"
                  label="Priority"
                  is_required
                  options={[
                    { id: "low", title: "Low" },
                    { id: "medium", title: "Medium" },
                    { id: "high", title: "High" },
                  ]}
                />
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> <code>is_required=&#123;true&#125;</code> — sirf UI asterisk</p>
                  <p><strong>Data OUT:</strong> Same string</p>
                </div>
              </CardContent>
            </Card>

            {/* 7. FORM INTEGRATION */}
            <Card>
              <CardHeader>
                <CardTitle>7. Form Integration</CardTitle>
                <CardDescription>
                  Submit karke live payload dekho. Sab fields react-hook-form se connected.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))} className="space-y-4">
                  <RadioInput
                    name="basic"
                    label="Size"
                    options={[
                      { id: "small", title: "Small" },
                      { id: "medium", title: "Medium" },
                      { id: "large", title: "Large" },
                    ]}
                  />
                  <RadioInput
                    name="horizontal"
                    label="Color"
                    orientation="horizontal"
                    options={[
                      { id: "red", title: "Red" },
                      { id: "green", title: "Green" },
                      { id: "blue", title: "Blue" },
                    ]}
                  />
                  <RadioInput
                    name="required"
                    label="Priority"
                    is_required
                    options={[
                      { id: "low", title: "Low" },
                      { id: "medium", title: "Medium" },
                      { id: "high", title: "High" },
                    ]}
                  />
                  <Button type="submit">Submit Form</Button>
                </form>
                <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                  <p><strong>Data IN:</strong> All field values in <code>defaultValues</code> format</p>
                  <p><strong>Data OUT:</strong> <code>&#123; basic: "medium", horizontal: "red", required: "high" &#125;</code></p>
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
