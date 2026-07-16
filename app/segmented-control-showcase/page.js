"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { SegmentedControl } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Home, Settings, User } from "lucide-react";

const defaultValues = {
  basic: "monthly",
  withIcons: "dark",
  smallSize: "home",
  fullWidth: "tab1",
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

export default function SegmentedControlShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Segmented Control — Showcase & Guide</h1>
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
                    Simple segmented control — string value.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SegmentedControl
                    name="basic"
                    label="Billing Cycle"
                    options={[
                      { id: "weekly", title: "Weekly" },
                      { id: "monthly", title: "Monthly" },
                      { id: "yearly", title: "Yearly" },
                    ]}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; basic: "monthly" &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>string</code> — e.g. <code>"monthly"</code></p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 2. WITH ICONS */}
              <Card>
                <CardHeader>
                  <CardTitle>2. With Icons</CardTitle>
                  <CardDescription>
                    <code>icon</code> — Lucide icon option ke saath.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SegmentedControl
                    name="withIcons"
                    label="Theme"
                    options={[
                      { id: "light", title: "Light", icon: <Home className="h-4 w-4" /> },
                      { id: "dark", title: "Dark", icon: <Settings className="h-4 w-4" /> },
                      { id: "system", title: "System", icon: <User className="h-4 w-4" /> },
                    ]}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; withIcons: "dark" &#125;</code> + <code>icon=&#123;&lt;Home /&gt;&#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>"dark"</code> — icon sirf UI, id mein nahi aata</p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. SIZES */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Sizes (sm / default / lg)</CardTitle>
                  <CardDescription>
                    <code>size</code> — teen sizes available.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-3">Small (sm)</p>
                    <SegmentedControl
                      name="smallSize"
                      size="sm"
                      options={[
                        { id: "home", title: "Home", icon: <Home className="h-3 w-3" /> },
                        { id: "settings", title: "Settings", icon: <Settings className="h-3 w-3" /> },
                        { id: "profile", title: "Profile", icon: <User className="h-3 w-3" /> },
                      ]}
                    />
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Default</p>
                    <SegmentedControl
                      label="Default Size"
                      options={[
                        { id: "a", title: "Option A" },
                        { id: "b", title: "Option B" },
                      ]}
                    />
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-3">Large (lg)</p>
                    <SegmentedControl
                      size="lg"
                      options={[
                        { id: "a", title: "Option A" },
                        { id: "b", title: "Option B" },
                      ]}
                    />
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>size="sm"</code> / <code>"default"</code> / <code>"lg"</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string</code> — size sirf UI hai</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 4. FULL WIDTH */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Full Width</CardTitle>
                  <CardDescription>
                    <code>fullWidth</code> — poori width occupy karega.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SegmentedControl
                    name="fullWidth"
                    label="Tabs"
                    fullWidth
                    options={[
                      { id: "tab1", title: "Overview" },
                      { id: "tab2", title: "Analytics" },
                      { id: "tab3", title: "Settings" },
                    ]}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>fullWidth</code> + <code>&#123; fullWidth: "tab1" &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>"tab1"</code> — fullWidth sirf layout hai</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled</code> — selection change nahi hoga.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SegmentedControl
                    name="disabled"
                    label="Locked Option"
                    disabled
                    options={[
                      { id: "a", title: "Option A" },
                      { id: "b", title: "Option B" },
                      { id: "c", title: "Option C" },
                    ]}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; disabled: "a" &#125;</code> + <code>disabled</code></p>
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
                    <code>is_required</code> — asterisk indicator.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SegmentedControl
                    name="required"
                    label="Select Plan"
                    is_required
                    options={[
                      { id: "free", title: "Free" },
                      { id: "pro", title: "Pro" },
                      { id: "enterprise", title: "Enterprise" },
                    ]}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>is_required</code></p>
                    <p><strong>Data OUT:</strong> <code>string</code> — asterisk sirf UI</p>
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
                    <p><strong>Full Payload:</strong> <code>&#123; basic, withIcons, smallSize, fullWidth, disabled, required &#125;</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Sab values selected option ki string hain. Live payload right side dekho.</p>
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
