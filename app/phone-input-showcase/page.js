"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { PhoneInput } from "@/components/FormElements";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Phone, Globe, Shield, ToggleLeft, AlertCircle } from "lucide-react";

const defaultValues = {
  basic: "",
  pkDefault: "",
  withValidation: "",
  disabled: "+923001234567",
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

export default function PhoneInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Phone Input — Showcase & Guide</h1>
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
                    Default country PK. Full international number format.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PhoneInput name="basic" label="Phone Number" />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; basic: "" &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>string</code> — full international format e.g. <code>"+923001234567"</code></p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 2. DEFAULT COUNTRY PK */}
              <Card>
                <CardHeader>
                  <CardTitle>2. Default Country (PK)</CardTitle>
                  <CardDescription>
                    <code>defaultCountry="PK"</code> — Pakistan pre-selected.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PhoneInput
                    name="pkDefault"
                    label="Pakistani Number"
                    defaultCountry="PK"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>defaultCountry="PK"</code></p>
                    <p><strong>Data OUT:</strong> <code>"+92XXXXXXXXXX"</code> — dial code + digits</p>
                    <p className="text-muted-foreground text-xs mt-2">Dropdown mein PK pre-selected hoga. Format example bhi dikhega.</p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. ALLOWED COUNTRIES */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Allowed Countries</CardTitle>
                  <CardDescription>
                    <code>allowedCountries</code> — sirf specific countries allowed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PhoneInput
                    label="Select Region"
                    allowedCountries={["PK", "IN", "AE", "SA"]}
                    defaultCountry="AE"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>allowedCountries=&#123;["PK", "IN", "AE", "SA"]&#125;</code></p>
                    <p><strong>Data OUT:</strong> Same international format string</p>
                    <p className="text-muted-foreground text-xs mt-2">Dropdown mein sirf yeh 4 countries dikhengi. Standalone — form ke bahar.</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 4. VALIDATION */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Validation</CardTitle>
                  <CardDescription>
                    <code>validateOnChange</code> — live validation on type.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PhoneInput
                    name="withValidation"
                    label="Validated Phone"
                    validateOnChange
                    helperText="Number validate hota rahega typing ke saath"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>validateOnChange</code></p>
                    <p><strong>Data OUT:</strong> <code>string</code> — invalid number pe error dikhega</p>
                    <p className="text-muted-foreground text-xs mt-2">Pattern match nahi hua to red error message ayega: "Please enter a valid Pakistan phone number"</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled</code> — number change nahi hoga.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PhoneInput
                    name="disabled"
                    label="Locked Phone"
                    disabled
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; disabled: "+923001234567" &#125;</code> + <code>disabled</code></p>
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
                  <PhoneInput
                    name="required"
                    label="Contact Number"
                    is_required
                    helperText="We'll use this to contact you"
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>is_required</code> + <code>helperText="..."</code></p>
                    <p><strong>Data OUT:</strong> Same <code>string</code> — asterisk sirf UI</p>
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
                    <p><strong>Full Payload:</strong> <code>&#123; basic, pkDefault, withValidation, disabled, required &#125;</code></p>
                    <p className="text-muted-foreground text-xs mt-2">Sab phone values full international format strings hain. Live payload right side dekho.</p>
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
