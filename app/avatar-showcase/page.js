"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { AvatarUpload } from "@/components/FormElements";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Camera, Crown, Building2 } from "lucide-react";

const defaultValues = {
  profilePhoto: null,
  coverPhoto: null,
  companyLogo: null,
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

export default function AvatarUploadShowcase() {
  const [basic, setBasic] = useState(null);
  const [sizeSm, setSizeSm] = useState(null);
  const [sizeMd, setSizeMd] = useState(null);
  const [sizeLg, setSizeLg] = useState(null);
  const [sizeXl, setSizeXl] = useState(null);
  const [circle, setCircle] = useState(null);
  const [square, setSquare] = useState(null);
  const [iconDefault, setIconDefault] = useState(null);
  const [iconCamera, setIconCamera] = useState(null);
  const [iconCrown, setIconCrown] = useState(null);
  const [prefilled, setPrefilled] = useState("https://i.pravatar.cc/300?img=12");

  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Avatar Upload — Showcase & Guide</h1>
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
              <CardDescription>Sirf <code>value</code> + <code>onChange</code>.</CardDescription>
            </CardHeader>
            <CardContent>
              <AvatarUpload value={basic} onChange={setBasic} />
              <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                <p><strong>Data IN:</strong> <code>value=&#123;basic&#125;</code> — initially <code>null</code></p>
                <p><strong>Data OUT:</strong> base64 string ya <code>null</code></p>
              </div>
            </CardContent>
          </Card>

          {/* 2. SIZES */}
          <Card>
            <CardHeader>
              <CardTitle>2. Sizes</CardTitle>
              <CardDescription><code>size</code>: <code>sm</code> (64px), <code>md</code> (96px), <code>lg</code> (128px), <code>xl</code> (160px)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-8">
                <AvatarUpload label="SM" size="sm" value={sizeSm} onChange={setSizeSm} />
                <AvatarUpload label="MD" size="md" value={sizeMd} onChange={setSizeMd} />
                <AvatarUpload label="LG" size="lg" value={sizeLg} onChange={setSizeLg} />
                <AvatarUpload label="XL" size="xl" value={sizeXl} onChange={setSizeXl} />
              </div>
            </CardContent>
          </Card>

          {/* 3. SHAPES */}
          <Card>
            <CardHeader>
              <CardTitle>3. Shapes</CardTitle>
              <CardDescription><code>shape</code>: <code>circle</code> (default) ya <code>square</code></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-8">
                <AvatarUpload label="Circle" shape="circle" size="xl" value={circle} onChange={setCircle} />
                <AvatarUpload label="Square" shape="square" size="xl" value={square} onChange={setSquare} />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* 4. CUSTOM ICONS */}
          <Card>
            <CardHeader>
              <CardTitle>4. Custom Icons</CardTitle>
              <CardDescription><code>icon</code> — Lucide icon. Default = <code>User</code></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-8">
                <AvatarUpload label="Default" size="lg" value={iconDefault} onChange={setIconDefault} />
                <AvatarUpload label="Camera" icon={Camera} size="lg" value={iconCamera} onChange={setIconCamera} />
                <AvatarUpload label="Crown" icon={Crown} size="lg" value={iconCrown} onChange={setIconCrown} />
              </div>
            </CardContent>
          </Card>

          {/* 5. PRE-FILLED */}
          <Card>
            <CardHeader>
              <CardTitle>5. Pre-filled Value</CardTitle>
              <CardDescription>URL ya base64 do — image load ho jayegi</CardDescription>
            </CardHeader>
            <CardContent>
              <AvatarUpload label="Existing Photo" size="xl" value={prefilled} onChange={setPrefilled} helperText="Hover karo — Edit/Remove dikhega" />
              <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                <p><strong>Data IN:</strong> <code>"https://..."</code> — img tag mein seedha load</p>
                <p><strong>Data OUT:</strong> Naya upload = base64, remove = <code>null</code></p>
              </div>
            </CardContent>
          </Card>

          {/* 6. DISABLED */}
          <Card>
            <CardHeader>
              <CardTitle>6. Disabled</CardTitle>
              <CardDescription><code>disabled=true</code> — interaction blocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-8">
                <AvatarUpload label="Empty" disabled size="lg" value={null} onChange={() => {}} />
                <AvatarUpload label="With Image" disabled size="lg" value="https://i.pravatar.cc/300?img=47" onChange={() => {}} />
              </div>
            </CardContent>
          </Card>

          {/* 7. HIDE EDIT */}
          <Card>
            <CardHeader>
              <CardTitle>7. Hide Edit Button</CardTitle>
              <CardDescription><code>showEditButton=&#123;false&#125;</code></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-8">
                <AvatarUpload label="Edit + Remove" showEditButton size="lg" value="https://i.pravatar.cc/300?img=32" onChange={() => {}} />
                <AvatarUpload label="Remove only" showEditButton={false} size="lg" value="https://i.pravatar.cc/300?img=32" onChange={() => {}} />
              </div>
            </CardContent>
          </Card>

          {/* 8. ERROR + HELPER */}
          <Card>
            <CardHeader>
              <CardTitle>8. Error, Helper, Required</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end gap-8">
                <AvatarUpload label="Helper" size="lg" helperText="Upload karo" value={null} onChange={() => {}} />
                <AvatarUpload label="Error" size="lg" error="File 2MB se bari hai" value={null} onChange={() => {}} />
                <AvatarUpload label="Required" size="lg" is_required helperText="Lazmi hai" value={null} onChange={() => {}} />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* 9. FORM INTEGRATION */}
          <Card>
            <CardHeader>
              <CardTitle>9. Form Integration</CardTitle>
              <CardDescription><code>name</code> lagao — Controller auto wrap. Right panel mein live payload dekho.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit((d) => alert(JSON.stringify(d, null, 2)))} className="space-y-6">
                <div className="flex flex-wrap items-end gap-8">
                  <AvatarUpload name="profilePhoto" label="Profile Photo" size="xl" shape="circle" is_required helperText="Click or drag" />
                  <AvatarUpload name="coverPhoto" label="Cover Photo" size="xl" shape="square" helperText="Optional" />
                  <AvatarUpload name="companyLogo" label="Company Logo" icon={Building2} size="lg" shape="square" helperText="Logo upload karo" />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Submit</Button>
                </div>
              </form>
              <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                <p><strong>Data IN:</strong> <code>defaultValues: &#123; profilePhoto: null &#125;</code></p>
                <p><strong>Data OUT:</strong> <code>data.profilePhoto</code> — base64 string ya <code>null</code></p>
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
