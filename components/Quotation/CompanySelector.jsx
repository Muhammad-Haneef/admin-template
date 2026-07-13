"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput, SelectInput, PhoneInput } from "@/components/FormElements";

const COUNTRY_OPTIONS = [
  { label: "Pakistan", value: "pk" },
  { label: "United Arab Emirates", value: "ae" },
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
];

export default function CompanySelector() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quotation From</CardTitle>
        <CardDescription>Your business details as they'll appear on the document</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <TextInput name="company.name" label="Business Name" is_required placeholder="Your business name" />
        </div>
        <div className="sm:col-span-2">
          <TextInput name="company.address" label="Address" placeholder="Street address" />
        </div>
        <TextInput name="company.city" label="City" placeholder="Karachi" />
        <SelectInput name="company.country" label="Country" placeholder="Select country" options={COUNTRY_OPTIONS} />
        <PhoneInput name="company.phone" label="Phone" placeholder="+92 3xx xxxxxxx" />
        <TextInput name="company.email" label="Email" placeholder="business@example.com" />
        <TextInput name="company.ntn" label="NTN" placeholder="National Tax Number" />
        <TextInput name="company.gst" label="GST / Sales Tax No." placeholder="Optional" />
      </CardContent>
    </Card>
  );
}
