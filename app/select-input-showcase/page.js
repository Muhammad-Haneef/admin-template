"use client";

import { useForm, FormProvider, useFormContext } from "react-hook-form";
import SelectInput from "@/components/FormElements/select-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Apple, Cherry, Grape, Citrus, Banana as BananaIcon, Loader2 } from "lucide-react";

const fruits = [
  { id: "apple", title: "Apple" },
  { id: "banana", title: "Banana" },
  { id: "mango", title: "Mango" },
  { id: "grapes", title: "Grapes" },
  { id: "orange", title: "Orange" },
];

const defaultValues = {
  basic: "",
  withIcons: "",
  disabled: "apple",
  required: "",
  searchable: "",
  clearable: "",
  createNew: "",
  withError: "",
  withHelper: "",
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

export default function SelectInputShowcase() {
  const form = useForm({ defaultValues });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Select Input — Showcase & Guide</h1>
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
                    Simple dropdown — <code>string</code> value. Options: fruits array.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SelectInput name="basic" label="Fruit" placeholder="Pick a fruit" options={fruits} />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm space-y-1">
                    <p><strong>Data IN:</strong> <code>&#123; basic: "" &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>"apple"</code> (option id string)</p>
                    <p className="text-muted-foreground text-xs mt-2">Options format: <code>[&#123; id: "apple", title: "Apple" &#125;, ...]</code></p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 2. WITH ICONS */}
              <Card>
                <CardHeader>
                  <CardTitle>2. With Icons</CardTitle>
                  <CardDescription>
                    Har option mein <code>icon</code> property — React element (JSX).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SelectInput
                    name="withIcons"
                    label="Fruit with Icons"
                    placeholder="Pick a fruit"
                    options={[
                      { id: "apple", title: "Apple", icon: <Apple className="h-4 w-4" /> },
                      { id: "banana", title: "Banana", icon: <BananaIcon className="h-4 w-4" /> },
                      { id: "mango", title: "Mango", icon: <Cherry className="h-4 w-4" /> },
                      { id: "grapes", title: "Grapes", icon: <Grape className="h-4 w-4" /> },
                      { id: "orange", title: "Orange", icon: <Citrus className="h-4 w-4" /> },
                    ]}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>icon: &lt;Apple /&gt;</code> — sirf UI</p>
                    <p><strong>Data OUT:</strong> Same string — <code>"apple"</code></p>
                  </div>
                </CardContent>
              </Card>

              {/* 3. SEARCHABLE */}
              <Card>
                <CardHeader>
                  <CardTitle>3. Searchable</CardTitle>
                  <CardDescription>
                    <code>searchable=true</code> — dropdown mein search box. Default <code>true</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SelectInput name="searchable" label="Search Fruit" placeholder="Search and pick..." options={fruits} searchable />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>searchable=&#123;true&#125;</code> (default)</p>
                    <p><strong>Data OUT:</strong> Same string</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 4. CLEARABLE */}
              <Card>
                <CardHeader>
                  <CardTitle>4. Clearable</CardTitle>
                  <CardDescription>
                    <code>clearable=true</code> — X button se selection clear. Default <code>true</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SelectInput name="clearable" label="Clearable Fruit" placeholder="Pick one (can clear)" options={fruits} />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>clearable=&#123;true&#125;</code> (default)</p>
                    <p><strong>Data OUT:</strong> <code>"apple"</code> ya <code>""</code> (cleared)</p>
                  </div>
                </CardContent>
              </Card>

              {/* 5. DISABLED */}
              <Card>
                <CardHeader>
                  <CardTitle>5. Disabled</CardTitle>
                  <CardDescription>
                    <code>disabled=true</code> — poori dropdown band. Individual option: <code>disabled: true</code>.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SelectInput name="disabled" label="Disabled Select" placeholder="Cannot change" options={fruits} disabled />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>disabled=&#123;true&#125;</code> + <code>defaultValues: &#123; disabled: "apple" &#125;</code></p>
                    <p><strong>Data OUT:</strong> <code>"apple"</code> — unchanged</p>
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
                  <SelectInput name="required" label="Required Fruit" placeholder="Must pick one" options={fruits} is_required />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>is_required=&#123;true&#125;</code> — sirf UI asterisk</p>
                    <p><strong>Data OUT:</strong> Same string</p>
                  </div>
                </CardContent>
              </Card>

              {/* 7. LOADING */}
              <Card>
                <CardHeader>
                  <CardTitle>7. Loading</CardTitle>
                  <CardDescription>
                    <code>loading=true</code> — spinner icon. Options load hone tak wait.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SelectInput label="Loading" placeholder="Loading options..." options={[]} loading />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>loading=&#123;true&#125;</code></p>
                    <p><strong>Data OUT:</strong> Spinner UI — no selection</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 8. CREATE NEW */}
              <Card>
                <CardHeader>
                  <CardTitle>8. Create New</CardTitle>
                  <CardDescription>
                    <code>onCreate</code> — search mein kuch likho aur naya option banao.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SelectInput
                    name="createNew"
                    label="Create or Select"
                    placeholder="Type to create new..."
                    options={fruits}
                    onCreate={(val) => alert(`Creating new option: "${val}"`)}
                  />
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>onCreate=&#123;fn&#125;</code> + searchable options</p>
                    <p><strong>Data OUT:</strong> Same string — onCreate callback fire hota hai</p>
                  </div>
                </CardContent>
              </Card>

              {/* 9. ERROR */}
              <Card>
                <CardHeader>
                  <CardTitle>9. Error</CardTitle>
                  <CardDescription>
                    <code>error</code> — red border + text. <code>helperText</code> — grey hint.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SelectInput name="withError" label="With Error" placeholder="Select one" options={fruits} error="Please select a fruit" />
                  <SelectInput name="withHelper" label="With Helper" placeholder="Select one" options={fruits} helperText="Choose your favorite fruit" />
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> <code>error="..."</code> — sirf UI</p>
                    <p><strong>Data OUT:</strong> Same string — error display only</p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* 10. FORM INTEGRATION */}
              <Card>
                <CardHeader>
                  <CardTitle>10. Form Integration</CardTitle>
                  <CardDescription>
                    Submit karke live payload dekho. Sab fields react-hook-form se connected.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data, null, 2)))} className="space-y-4">
                    <SelectInput name="basic" label="Fruit" placeholder="Pick a fruit" options={fruits} />
                    <SelectInput name="required" label="Required" placeholder="Must pick" options={fruits} is_required />
                    <Button type="submit">Submit Form</Button>
                  </form>
                  <div className="mt-4 bg-muted/50 rounded-lg p-4 text-sm">
                    <p><strong>Data IN:</strong> All field values in <code>defaultValues</code> format</p>
                    <p><strong>Data OUT:</strong> <code>&#123; basic: "apple", required: "...", ... &#125;</code></p>
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
