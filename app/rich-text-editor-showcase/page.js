"use client"

import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { RichTextEditor } from "@/components/FormElements"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Bold, Italic, AlignLeft, Image, Video } from "lucide-react"

const defaultValues = {
  basic: "<p>Hello World</p>",
  minimal: "<p>Bold and italic only</p>",
  full: "",
  disabled: "<p>Cannot edit</p>",
  required: "",
}

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

export default function RichTextEditorShowcasePage() {
  const methods = useForm({ defaultValues })

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10 max-w-7xl">
        <h1 className="text-3xl font-bold mb-2">RichTextEditor Showcase</h1>
        <p className="text-muted-foreground mb-8">
          A rich text editor component with configurable toolbar and features.
        </p>
        <FormProvider {...methods}>
          <div className="flex gap-8">
            <div className="flex-1 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Usage (Full Toolbar)</CardTitle>
                  <CardDescription>
                    Rich text editor with the default full toolbar configuration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" default="&lt;p&gt;Hello World&lt;/p&gt;"
                  </div>
                  <RichTextEditor
                    name="basic"
                    label="Basic Editor"
                    placeholder="Start typing..."
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> HTML string like "&lt;p&gt;Hello World&lt;/p&gt;"
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Minimal Toolbar</CardTitle>
                  <CardDescription>
                    Rich text editor with minimal toolbar (bold and italic only).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="minimal" default="&lt;p&gt;Bold and italic only&lt;/p&gt;" + toolbarConfig="minimal"
                  </div>
                  <RichTextEditor
                    name="minimal"
                    label="Minimal Editor"
                    toolbarConfig="minimal"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> HTML string with basic formatting
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Basic Toolbar</CardTitle>
                  <CardDescription>
                    Rich text editor with basic toolbar configuration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" default="" + toolbarConfig="basic"
                  </div>
                  <RichTextEditor
                    name="basic"
                    label="Basic Toolbar Editor"
                    toolbarConfig="basic"
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> HTML string
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Character Count</CardTitle>
                  <CardDescription>
                    Rich text editor with character count display.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" + showCharCount=true
                  </div>
                  <RichTextEditor
                    name="basic"
                    label="Editor with Char Count"
                    showCharCount
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> HTML string with character count
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Content Size</CardTitle>
                  <CardDescription>
                    Rich text editor with content size display.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" + showContentSize=true
                  </div>
                  <RichTextEditor
                    name="basic"
                    label="Editor with Content Size"
                    showContentSize
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> HTML string with size info
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Custom Height</CardTitle>
                  <CardDescription>
                    Rich text editor with custom height.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="basic" + height=400
                  </div>
                  <RichTextEditor
                    name="basic"
                    label="Tall Editor"
                    height={400}
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> HTML string
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Disabled</CardTitle>
                  <CardDescription>
                    A disabled rich text editor that cannot be edited.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="disabled" default="&lt;p&gt;Cannot edit&lt;/p&gt;" + disabled
                  </div>
                  <RichTextEditor
                    name="disabled"
                    label="Disabled Editor"
                    disabled
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> HTML string "&lt;p&gt;Cannot edit&lt;/p&gt;" (unchanged)
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Required</CardTitle>
                  <CardDescription>
                    A required rich text editor with validation indicator.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> name="required" default="" + is_required
                  </div>
                  <RichTextEditor
                    name="required"
                    label="Required Editor"
                    is_required
                  />
                  <div className="text-xs text-muted-foreground">
                    <strong>Data OUT:</strong> HTML string
                  </div>
                </CardContent>
              </Card>

              <Separator />

              <Card>
                <CardHeader>
                  <CardTitle>Form Integration</CardTitle>
                  <CardDescription>
                    Submit the form to see all rich text editor values.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-xs text-muted-foreground">
                    <strong>Data IN:</strong> Multiple rich text editor fields in a form
                  </div>
                  <RichTextEditor name="basic" label="Basic" />
                  <RichTextEditor name="minimal" label="Minimal" />
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
