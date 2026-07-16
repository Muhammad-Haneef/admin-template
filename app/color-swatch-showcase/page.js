"use client"

import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { ColorSwatchPicker } from "@/components/FormElements"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Palette, Check, X } from "lucide-react"

const defaultValues = {
  basic: "",
  preSelected: "#3357FF",
  disabled: "#FF5733",
  required: "",
}

const customColors = [
  { label: "#FF5733", value: "#FF5733", name: "Coral Red" },
  { label: "#33FF57", value: "#33FF57", name: "Neon Green" },
  { label: "#3357FF", value: "#3357FF", name: "Ocean Blue" },
  { label: "#F3FF33", value: "#F3FF33", name: "Sunshine Yellow" },
  { label: "#FF33F6", value: "#FF33F6", name: "Hot Pink" },
  { label: "#33FFF6", value: "#33FFF6", name: "Turquoise" },
  { label: "#8B5CF6", value: "#8B5CF6", name: "Purple" },
  { label: "#F97316", value: "#F97316", name: "Orange" },
]

const defaultColors = [
  { label: "#EF4444", value: "#EF4444", name: "Red" },
  { label: "#F97316", value: "#F97316", name: "Orange" },
  { label: "#EAB308", value: "#EAB308", name: "Yellow" },
  { label: "#22C55E", value: "#22C55E", name: "Green" },
  { label: "#3B82F6", value: "#3B82F6", name: "Blue" },
  { label: "#8B5CF6", value: "#8B5CF6", name: "Purple" },
  { label: "#EC4899", value: "#EC4899", name: "Pink" },
  { label: "#6B7280", value: "#6B7280", name: "Gray" },
]

function LiveJsonPanel() {
  const { watch } = useFormContext()
  const watchedValues = watch()

  return (
    <div className="w-80 shrink-0">
      <div className="sticky top-10 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Default Values (Data IN)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-60">
              {JSON.stringify(defaultValues, null, 2)}
            </pre>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Live Watched Values (Data OUT)</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-60">
              {JSON.stringify(watchedValues, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ColorSwatchShowcasePage() {
  const methods = useForm({ defaultValues })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">ColorSwatchPicker Showcase</h1>
        <p className="text-muted-foreground mb-8">
          A color swatch picker component for selecting colors from predefined options.
        </p>
        <FormProvider {...methods}>
          <div className="flex gap-8">
            <div className="flex-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Usage</CardTitle>
                  <CardDescription>
                    Default color swatch picker with built-in color options.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" default="" (empty string)
                  </div>
                  <ColorSwatchPicker name="basic" label="Pick a Color" />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Hex string like "#3B82F6" or ""
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Pre-selected Value</CardTitle>
                  <CardDescription>
                    A color swatch with a pre-selected value.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="preSelected" default="#3357FF"
                  </div>
                  <ColorSwatchPicker
                    name="preSelected"
                    label="Pre-selected Color"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Hex string "#3357FF"
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Custom Colors</CardTitle>
                  <CardDescription>
                    Passing a custom colors array with label, value, and name.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> colors=[&#123;label:"#FF5733", value:"#FF5733", name:"Coral Red"&#125;, ...]
                  </div>
                  <ColorSwatchPicker
                    name="basic"
                    label="Custom Colors"
                    colors={customColors}
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Hex string like "#FF5733"
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Allow Clear</CardTitle>
                  <CardDescription>
                    Enables the clear button to reset the selected color.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" default="" + allowClear
                  </div>
                  <ColorSwatchPicker
                    name="basic"
                    label="Color with Clear"
                    allowClear
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Hex string or "" when cleared
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Disabled</CardTitle>
                  <CardDescription>
                    A disabled color swatch that cannot be changed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="disabled" default="#FF5733" + disabled
                  </div>
                  <ColorSwatchPicker
                    name="disabled"
                    label="Disabled Color"
                    disabled
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Hex string "#FF5733" (unchanged)
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Required</CardTitle>
                  <CardDescription>
                    A required color swatch with validation indicator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="required" default="" + is_required
                  </div>
                  <ColorSwatchPicker
                    name="required"
                    label="Required Color"
                    is_required
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Hex string like "#22C55E"
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Error State</CardTitle>
                  <CardDescription>
                    Color swatch with an error message displayed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" + error="Please select a color"
                  </div>
                  <ColorSwatchPicker
                    name="basic"
                    label="Color with Error"
                    error="Please select a color"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Validation state
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Form Integration</CardTitle>
                  <CardDescription>
                    Submit the form to see all color swatch values.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> Multiple color swatch fields in a form
                  </div>
                  <ColorSwatchPicker
                    name="basic"
                    label="Pick a Color"
                  />
                  <ColorSwatchPicker
                    name="preSelected"
                    label="Pre-selected"
                  />
                  <Button
                    type="button"
                    onClick={methods.handleSubmit((data) => {
                      alert(JSON.stringify(data, null, 2))
                    })}
                  >
                    Submit Form
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Object with all field values
                  </div>
                </CardContent>
              </Card>
            </div>
            <LiveJsonPanel />
          </div>
        </FormProvider>
      </div>
    </div>
  )
}
