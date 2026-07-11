# FormElements - Complete Component Library

## Overview
A comprehensive, highly-featured form components library built with **shadcn UI**, **React Hook Form**, and **Tailwind CSS**. All components are production-ready with full TypeScript support, accessibility features, and responsive design.

---

## 📦 Available Components (27 Total)

### Basic Input Components
1. **TextInput** - Standard text input with validation
2. **NumberInput** - Number input with min/max, decimal support
3. **PasswordInput** - Password with strength indicator & toggle visibility
4. **TextareaInput** - Multi-line text with character count

### Selection Components
5. **SelectInput** - Dropdown select with search
6. **MultiSelectInput** - Multiple selection dropdown with chips
7. **CheckboxInput** - Single checkbox
8. **RadioInput** - Radio button group
9. **SwitchInput** - Toggle switch with labels

### Date & Time Components
10. **DatePickerInput** - Single date picker with calendar
11. **DateRangePicker** - Date range selection
12. **DateTimePickerInput** - Date and time picker
13. **YearPicker** ⭐ NEW - Year selection with decade navigation

### Advanced Input Components
14. **OtpInput** - One-time password input (6-digit)
15. **TagInput** - Tags/chips input with add/remove
16. **SliderInput** - Range slider with min/max
17. **ColorPickerInput** - Color picker with palette
18. **PhoneInput** - International phone with country codes
19. **RichTextEditor** - WYSIWYG text editor (Quill.js)

### File Upload Components
20. **FileUpload** - Multi-file upload with preview
21. **ImageUpload** ⭐ NEW - Single image with zoom & aspect ratio
22. **MultiImageUpload** ⭐ NEW - Multiple images with reorder & zoom
23. **AvatarUpload** ⭐ NEW - Profile picture upload (circle/square)

### Card Selection Components
24. **RadioCards** ⭐ NEW - Visual radio button cards with icons
25. **CheckboxCards** ⭐ NEW - Visual checkbox cards with max limit

### Specialized Components
26. **SegmentedControl** ⭐ NEW - iOS-style segmented buttons
27. **WeekTimingInput** ⭐ NEW - Weekly schedule with time slots

---

## 🎨 New Components Features

### ImageUpload
```jsx
<ImageUpload
  name="productImage"
  label="Product Image"
  aspectRatio="square" // square, video, portrait, landscape, auto
  maxSize={5 * 1024 * 1024} // 5MB
  allowZoom={true}
  showPreview={true}
/>
```

**Features:**
- Drag & drop support
- Aspect ratio control
- Image zoom modal
- File size validation
- Edit/remove buttons on hover
- Base64 conversion

---

### MultiImageUpload
```jsx
<MultiImageUpload
  name="gallery"
  label="Product Gallery"
  maxImages={10}
  gridCols={3}
  allowReorder={true} // Drag to reorder
  showCount={true}
/>
```

**Features:**
- Multiple image upload
- Drag & drop
- Reorder images (drag handles)
- Individual zoom/delete
- Grid layout (1-4 columns)
- Count indicator
- Thumbnail preview

---

### AvatarUpload
```jsx
<AvatarUpload
  name="avatar"
  label="Profile Picture"
  size="lg" // sm, md, lg, xl
  shape="circle" // circle, square
  showEditButton={true}
  maxSize={2 * 1024 * 1024}
/>
```

**Features:**
- Circle or square shape
- Multiple sizes
- Drag & drop
- Edit/remove on hover
- Default user icon placeholder

---

### SegmentedControl
```jsx
<SegmentedControl
  name="viewMode"
  label="View Mode"
  size="default" // sm, default, lg
  fullWidth={true}
  options={[
    { label: "List", value: "list", icon: <List /> },
    { label: "Grid", value: "grid", icon: <Grid /> },
    { label: "Map", value: "map", icon: <Map /> }
  ]}
/>
```

**Features:**
- iOS-style design
- Icon support
- Multiple sizes
- Smooth transitions
- Full width option

---

### YearPicker
```jsx
<YearPicker
  name="birthYear"
  label="Birth Year"
  minYear={1900}
  maxYear={2024}
  placeholder="Select year"
/>
```

**Features:**
- Decade navigation
- Grid layout (3x4)
- Min/max year limits
- Current year highlight
- Popover interface

---

### RadioCards
```jsx
<RadioCards
  name="plan"
  label="Select Plan"
  columns={3}
  showIcon={true}
  showDescription={true}
  options={[
    {
      label: "Basic",
      value: "basic",
      description: "$10/month",
      icon: <Package />
    },
    {
      label: "Pro",
      value: "pro",
      description: "$20/month",
      icon: <Star />
    }
  ]}
/>
```

**Features:**
- Visual card layout
- Icons & descriptions
- Grid columns (1-4)
- Selected indicator
- Hover effects
- Disabled state support

---

### CheckboxCards
```jsx
<CheckboxCards
  name="features"
  label="Select Features"
  columns={2}
  max={3} // Maximum selections
  showIcon={true}
  options={[
    {
      label: "Feature 1",
      value: "f1",
      description: "Description here",
      icon: <Icon1 />
    }
  ]}
/>
```

**Features:**
- Multiple selections
- Max limit control
- Visual cards
- Selection counter
- Icons & descriptions
- Grid layout

---

### WeekTimingInput
```jsx
<WeekTimingInput
  name="businessHours"
  label="Business Hours"
  allowMultipleSlots={true}
  timeFormat="24h" // 12h or 24h
/>
```

**Features:**
- 7-day weekly schedule
- Enable/disable per day
- Multiple time slots per day
- Copy schedule to all days
- Add/remove time slots
- Time validation

**Output Structure:**
```javascript
{
  monday: {
    enabled: true,
    slots: [
      { start: "09:00", end: "17:00" },
      { start: "18:00", end: "21:00" }
    ]
  },
  tuesday: { enabled: false, slots: [] },
  // ... other days
}
```

---

## 🎯 Common Features (All Components)

### React Hook Form Integration
- ✅ Full `useFormContext` support
- ✅ Controller for complex components
- ✅ Error handling & validation
- ✅ `name` prop for form registration

### Accessibility
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support

### Styling
- ✅ shadcn UI components
- ✅ Tailwind CSS
- ✅ Dark mode ready
- ✅ Responsive design
- ✅ Consistent spacing

### Validation
- ✅ Required field indicator (*)
- ✅ Error messages
- ✅ Helper text
- ✅ Real-time validation
- ✅ Custom validators

---

## 📝 Usage Example

```jsx
import {
  TextInput,
  ImageUpload,
  RadioCards,
  SegmentedControl,
  WeekTimingInput
} from "@/components/FormElements";

function MyForm() {
  const methods = useForm({
    defaultValues: {
      name: "",
      avatar: null,
      plan: "basic",
      viewMode: "list",
      schedule: {}
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          name="name"
          label="Full Name"
          is_required={true}
        />

        <ImageUpload
          name="avatar"
          label="Profile Picture"
          aspectRatio="square"
        />

        <RadioCards
          name="plan"
          label="Choose Plan"
          columns={3}
          options={planOptions}
        />

        <SegmentedControl
          name="viewMode"
          label="View Mode"
          options={viewOptions}
        />

        <WeekTimingInput
          name="schedule"
          label="Working Hours"
          allowMultipleSlots={true}
        />

        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
```

---

## 🔧 Props Reference

### Common Props (All Components)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | required | Form field name |
| `label` | string | - | Field label |
| `error` | string | - | Error message |
| `helperText` | string | - | Helper text below field |
| `tooltip` | string | - | Tooltip text |
| `disabled` | boolean | false | Disable field |
| `is_required` | boolean | false | Show * indicator |
| `className` | string | - | Custom CSS classes |

---

## 🎨 Customization

All components support:
- Custom styling via `className`
- shadcn UI theme variables
- Tailwind CSS utilities
- Dark mode automatic support

---

## 📦 Installation

Components are already built-in. Just import and use:

```jsx
import { ComponentName } from "@/components/FormElements";
```

---

## 🚀 Build Status

✅ All 27 components built
✅ Production ready
✅ TypeScript compatible
✅ Build successful
✅ Zero errors

---

## 📚 Component Matrix

| Component | Basic | Advanced | File Upload | Selection | Specialized |
|-----------|-------|----------|-------------|-----------|-------------|
| TextInput | ✅ | | | | |
| NumberInput | ✅ | | | | |
| PasswordInput | | ✅ | | | |
| TextareaInput | ✅ | | | | |
| SelectInput | | | | ✅ | |
| MultiSelectInput | | | | ✅ | |
| CheckboxInput | ✅ | | | | |
| RadioInput | ✅ | | | | |
| SwitchInput | ✅ | | | | |
| DatePickerInput | | ✅ | | | |
| DateRangePicker | | ✅ | | | |
| DateTimePickerInput | | ✅ | | | |
| OtpInput | | ✅ | | | |
| TagInput | | ✅ | | | |
| SliderInput | | ✅ | | | |
| ColorPickerInput | | ✅ | | | |
| PhoneInput | | ✅ | | | |
| RichTextEditor | | ✅ | | | |
| FileUpload | | | ✅ | | |
| ImageUpload | | | ✅ | | |
| MultiImageUpload | | | ✅ | | |
| AvatarUpload | | | ✅ | | |
| YearPicker | | ✅ | | | |
| RadioCards | | | | ✅ | |
| CheckboxCards | | | | ✅ | |
| SegmentedControl | | | | ✅ | |
| WeekTimingInput | | | | | ✅ |

---

## 🎯 Future Enhancements

- [ ] DateRangePresets (This week, Last month, etc.)
- [ ] SignaturePad - Canvas signature
- [ ] LocationPicker - Map integration
- [ ] MonthPicker - Month selection
- [ ] CurrencyInput - Currency with symbol
- [ ] MentionInput - @mentions support
- [ ] CodeEditor - Syntax highlighted code
- [ ] MarkdownEditor - Live markdown preview

---

**Version**: 2.0.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅
