"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import all FormElements
import {
  TextInput,
  NumberInput,
  PasswordInput,
  TextareaInput,
  SelectInput,
  MultiSelectInput,
  CheckboxInput,
  RadioInput,
  SwitchInput,
  DatePickerInput,
  DateRangePicker,
  DateTimePickerInput,
  OtpInput,
  TagInput,
  SliderInput,
  FileUpload,
  ColorPickerInput,
  PhoneInput,
  RichTextEditor,
  ImageUpload,
  MultiImageUpload,
  AvatarUpload,
  SegmentedControl,
  YearPicker,
  RadioCards,
  CheckboxCards,
  WeekTimingInput,
  IconPicker,
  CategoryTreeSelect,
  ColorSwatchPicker,
  UserSelector,
  EmailRecipientsSelector,
} from "@/components/FormElements";

// Validation schema
const formSchema = z.object({
  // Basic Inputs
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  age: z.number().min(18, "Must be at least 18").optional().or(z.string()),
  bio: z.string().optional(),
  
  // Selection Inputs
  country: z.string().optional(),
  skills: z.array(z.any()).optional(),
  gender: z.string().optional(),
  subscribe: z.boolean().optional(),
  notifications: z.boolean().optional(),
  
  // Date Inputs
  birthDate: z.date().optional().or(z.string()),
  dateRange: z.object({ from: z.date().optional(), to: z.date().optional() }).optional(),
  appointmentDateTime: z.date().optional().or(z.string()),
  graduationYear: z.string().optional(),
  
  // Advanced Inputs
  otp: z.string().optional(),
  tags: z.array(z.string()).optional(),
  experience: z.number().optional().or(z.string()),
  profilePicture: z.any().optional(),
  portfolio: z.array(z.any()).optional(),
  avatar: z.any().optional(),
  favoriteColor: z.string().optional(),
  phone: z.string().optional(),
  
  // Rich Content
  description: z.string().optional(),
  
  // Card Selection
  plan: z.string().optional(),
  features: z.array(z.string()).optional(),
  
  // Specialized
  icon: z.string().optional(),
  category: z.string().optional(),
  themeColor: z.string().optional(),
  assignedUser: z.any().optional(),
  emailRecipients: z.array(z.any()).optional(),
  
  // Schedule
  availability: z.any().optional(),
  
  // Segmented
  mode: z.string().optional(),
});

// Sample data
const countries = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Pakistan", value: "pk" },
  { label: "India", value: "in" },
];

const skills = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "Node.js", value: "nodejs" },
  { label: "Python", value: "python" },
];

const categories = [
  {
    label: "Electronics",
    children: [
      { label: "Mobile Phones", children: [{ label: "Android" }, { label: "iOS" }] },
      { label: "Laptops", children: [{ label: "Gaming" }, { label: "Business" }] },
    ],
  },
  {
    label: "Fashion",
    children: [
      { label: "Men's Clothing" },
      { label: "Women's Clothing" },
    ],
  },
];

const plans = [
  { id: "free", title: "Free", description: "Basic features for personal use" },
  { id: "pro", title: "Pro", description: "Advanced features for professionals" },
  { id: "enterprise", title: "Enterprise", description: "Custom solutions for teams" },
];

const features = [
  { id: "analytics", title: "Analytics", description: "Track your performance" },
  { id: "api", title: "API Access", description: "Integrate with other tools" },
  { id: "support", title: "Priority Support", description: "24/7 customer service" },
];

export default function FormShowcase() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: "",
      bio: "",
      country: "",
      skills: [],
      gender: "",
      subscribe: false,
      notifications: true,
      tags: [],
      experience: 5,
      description: "",
      plan: "",
      features: [],
      icon: "",
      category: "",
      themeColor: "",
      mode: "light",
      emailRecipients: [],
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Form Elements Showcase</h1>
        <p className="text-muted-foreground mt-2">
          A comprehensive collection of 33 reusable form components built with shadcn/ui and react-hook-form
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Inputs</TabsTrigger>
              <TabsTrigger value="selection">Selection</TabsTrigger>
              <TabsTrigger value="dates">Date & Time</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="specialized">Specialized</TabsTrigger>
            </TabsList>

            {/* Basic Inputs Tab */}
            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Text & Basic Inputs</CardTitle>
                  <CardDescription>
                    Standard text inputs, numbers, passwords, and text areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    name="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    is_required
                    helperText="Your given name"
                  />
                  
                  <TextInput
                    name="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    is_required
                  />
                  
                  <TextInput
                    name="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    is_required
                    tooltip="We'll never share your email"
                  />
                  
                  <PasswordInput
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    is_required
                    helperText="Minimum 8 characters"
                  />
                  
                  <NumberInput
                    name="age"
                    label="Age"
                    placeholder="Enter your age"
                    min={18}
                    max={100}
                  />
                  
                  <PhoneInput
                    name="phone"
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
                  />
                  
                  <div className="md:col-span-2">
                    <TextareaInput
                      name="bio"
                      label="Biography"
                      placeholder="Tell us about yourself..."
                      rows={4}
                      helperText="Maximum 500 characters"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>OTP & Tags</CardTitle>
                  <CardDescription>
                    One-time password input and tag management
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <OtpInput
                    name="otp"
                    label="Verification Code"
                    length={6}
                    helperText="Enter the 6-digit code sent to your email"
                  />
                  
                  <TagInput
                    name="tags"
                    label="Tags"
                    placeholder="Add tags..."
                    helperText="Press Enter to add a tag"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Selection Tab */}
            <TabsContent value="selection" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dropdowns & Multi-Select</CardTitle>
                  <CardDescription>
                    Single and multiple selection inputs
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    name="country"
                    label="Country"
                    placeholder="Select your country"
                    options={countries}
                    is_required
                  />
                  
                  <MultiSelectInput
                    name="skills"
                    label="Skills"
                    placeholder="Select your skills"
                    options={skills}
                    helperText="Select all that apply"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Radio, Checkbox & Switch</CardTitle>
                  <CardDescription>
                    Boolean and single-choice selection
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RadioInput
                    name="gender"
                    label="Gender"
                    options={[
                      { label: "Male", value: "male" },
                      { label: "Female", value: "female" },
                      { label: "Other", value: "other" },
                    ]}
                  />
                  
                  <div className="space-y-4">
                    <CheckboxInput
                      name="subscribe"
                      label="Subscribe to newsletter"
                      helperText="Get weekly updates"
                    />
                    
                    <SwitchInput
                      name="notifications"
                      label="Enable Notifications"
                      helperText="Receive push notifications"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card-based Selection</CardTitle>
                  <CardDescription>
                    Visual selection with cards
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioCards
                    name="plan"
                    label="Choose Your Plan"
                    options={plans}
                  />
                  
                  <Separator />
                  
                  <CheckboxCards
                    name="features"
                    title="Select Features"
                    options={features}
                    max={2}
                    helperText="Choose up to 2 features"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Segmented Control</CardTitle>
                  <CardDescription>
                    iOS-style segmented button group
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SegmentedControl
                    name="mode"
                    label="Display Mode"
                    options={[
                      { label: "Light", value: "light" },
                      { label: "Dark", value: "dark" },
                      { label: "Auto", value: "auto" },
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dates Tab */}
            <TabsContent value="dates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Date & Time Pickers</CardTitle>
                  <CardDescription>
                    Date, time, and range selection components
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DatePickerInput
                    name="birthDate"
                    label="Date of Birth"
                    placeholder="Select your birth date"
                  />
                  
                  <DateTimePickerInput
                    name="appointmentDateTime"
                    label="Appointment"
                    placeholder="Select date and time"
                  />
                  
                  <YearPicker
                    name="graduationYear"
                    label="Graduation Year"
                    placeholder="Select year"
                    startYear={1980}
                    endYear={2030}
                  />
                  
                  <div className="md:col-span-2">
                    <DateRangePicker
                      name="dateRange"
                      label="Project Duration"
                      placeholder="Select date range"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>
                    Manage weekly timing with multiple slots per day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WeekTimingInput
                    name="availability"
                    label="Availability"
                    helperText="Set your weekly availability"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advanced Tab */}
            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>File Uploads</CardTitle>
                  <CardDescription>
                    Single, multiple, and avatar image uploads
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FileUpload
                    name="document"
                    label="Upload Document"
                    accept=".pdf,.doc,.docx"
                    maxSize={5}
                    helperText="PDF or DOC (Max 5MB)"
                  />
                  
                  <ImageUpload
                    name="profilePicture"
                    label="Profile Picture"
                    aspectRatio={16 / 9}
                    helperText="16:9 aspect ratio"
                  />
                  
                  <AvatarUpload
                    name="avatar"
                    label="Avatar"
                    shape="circle"
                    size="lg"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Multi-Image Upload</CardTitle>
                  <CardDescription>
                    Upload multiple images with drag & drop reordering
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MultiImageUpload
                    name="portfolio"
                    label="Portfolio Images"
                    maxFiles={5}
                    helperText="Upload up to 5 images"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color & Slider</CardTitle>
                  <CardDescription>
                    Color picker and range slider
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorPickerInput
                    name="favoriteColor"
                    label="Favorite Color"
                    helperText="Pick your favorite color"
                  />
                  
                  <SliderInput
                    name="experience"
                    label="Years of Experience"
                    min={0}
                    max={20}
                    step={1}
                    helperText="Slide to set experience"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rich Text Editor</CardTitle>
                  <CardDescription>
                    Full-featured WYSIWYG editor with image upload
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RichTextEditor
                    name="description"
                    label="Project Description"
                    placeholder="Describe your project in detail..."
                    height={300}
                    toolbarConfig="full"
                    allowImageUpload
                    showCharCount
                    showContentSize
                    helperText="Supports images, videos, and rich formatting"
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Specialized Tab */}
            <TabsContent value="specialized" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Icon Picker</CardTitle>
                  <CardDescription>
                    Select icons from a searchable grid
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <IconPicker
                    name="icon"
                    label="Select Icon"
                    placeholder="Choose an icon"
                    tooltip="Icon will be used in navigation"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Tree Select</CardTitle>
                  <CardDescription>
                    Navigate through hierarchical categories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryTreeSelect
                    name="category"
                    label="Product Category"
                    placeholder="Select a category"
                    categories={categories}
                    helperText="Navigate through nested categories"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Swatch Picker</CardTitle>
                  <CardDescription>
                    Choose from predefined color swatches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ColorSwatchPicker
                    name="themeColor"
                    label="Theme Color"
                    placeholder="Select a theme color"
                    allowClear
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Selector</CardTitle>
                  <CardDescription>
                    Select users from a searchable modal with avatars
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserSelector
                    name="assignedUser"
                    label="Assign To"
                    placeholder="Select a user"
                    helperText="Choose who to assign this task to"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Recipients Selector</CardTitle>
                  <CardDescription>
                    Select recipients from groups, roles, or add custom emails
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmailRecipientsSelector
                    name="emailRecipients"
                    label="Email Recipients"
                    placeholder="Choose recipients..."
                    module="Deals"
                    helperText="Select from roles, users, or add custom emails"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset Form
            </Button>
            <Button type="submit">
              Submit Form
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* Form State Debug */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Form State (Debug)</CardTitle>
          <CardDescription>
            Current form values and errors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-96 text-xs">
            {JSON.stringify(
              {
                values: form.watch(),
                errors: form.formState.errors,
              },
              null,
              2
            )}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
