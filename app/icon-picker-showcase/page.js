"use client"

import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { IconPicker } from "@/components/FormElements"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Home, Settings, Search } from "lucide-react"

const defaultValues = {
  basic: "",
  preSelected: "home",
  disabled: "settings",
  required: "",
}

const customIcons = [
  "home",
  "search",
  "settings",
  "user",
  "mail",
  "heart",
  "star",
  "bell",
  "calendar",
  "file",
  "folder",
  "image",
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

export default function IconPickerShowcasePage() {
  const methods = useForm({ defaultValues })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">IconPicker Showcase</h1>
        <p className="text-muted-foreground mb-8">
          An icon picker component for selecting icons from a searchable grid.
        </p>
        <FormProvider {...methods}>
          <div className="flex gap-8">
            <div className="flex-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Usage</CardTitle>
                  <CardDescription>
                    Default icon picker with built-in icon options.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" default="" (empty string)
                  </div>
                  <IconPicker name="basic" label="Pick an Icon" />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Icon name string like "home" or ""
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Pre-selected</CardTitle>
                  <CardDescription>
                    An icon picker with a pre-selected icon.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="preSelected" default="home"
                  </div>
                  <IconPicker
                    name="preSelected"
                    label="Pre-selected Icon"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Icon name "home"
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Custom Icons</CardTitle>
                  <CardDescription>
                    Passing a custom icons array to limit available options.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> icons=["home", "search", "settings", ...]
                  </div>
                  <IconPicker
                    name="basic"
                    label="Custom Icons"
                    icons={customIcons}
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Icon name string
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Disabled</CardTitle>
                  <CardDescription>
                    A disabled icon picker that cannot be changed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="disabled" default="settings" + disabled
                  </div>
                  <IconPicker
                    name="disabled"
                    label="Disabled Icon"
                    disabled
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Icon name "settings" (unchanged)
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Required</CardTitle>
                  <CardDescription>
                    A required icon picker with validation indicator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="required" default="" + is_required
                  </div>
                  <IconPicker
                    name="required"
                    label="Required Icon"
                    is_required
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> Icon name string
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Error State</CardTitle>
                  <CardDescription>
                    Icon picker with an error message displayed.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" + error="Please select an icon"
                  </div>
                  <IconPicker
                    name="basic"
                    label="Icon with Error"
                    error="Please select an icon"
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
                    Submit the form to see all icon picker values.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> Multiple icon picker fields in a form
                  </div>
                  <IconPicker name="basic" label="Pick an Icon" />
                  <IconPicker name="preSelected" label="Pre-selected" />
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
