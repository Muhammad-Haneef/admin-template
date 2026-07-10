"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Building2, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { TextInput, TextareaInput, PhoneInput } from "@/components/FormElements";

export default function CompanySelector() {
  const { setValue, watch } = useFormContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [companyData, setCompanyData] = useState({
    name: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    ntn: "",
    gst: ""
  });

  const company = watch("company");

  // Load company data into modal when opening
  const handleOpenEdit = () => {
    if (company) {
      setCompanyData(company);
    }
    setIsEditModalOpen(true);
  };

  const handleSaveCompany = () => {
    setValue("company", companyData, { shouldValidate: true });
    setIsEditModalOpen(false);
  };

  const handleFieldChange = (field, value) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Quotation From
          </h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleOpenEdit}
            className="text-xs"
          >
            <Edit2 className="w-3 h-3 mr-1" />
            Edit
          </Button>
        </div>

        {company && company.name ? (
          <div className="space-y-2 text-sm">
            <p className="font-semibold text-base">{company.name}</p>
            {company.address && <p className="text-muted-foreground">{company.address}</p>}
            {(company.city || company.country) && (
              <p className="text-muted-foreground">
                {[company.city, company.country].filter(Boolean).join(", ")}
              </p>
            )}
            {company.phone && (
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="font-medium">Phone:</span> {company.phone}
              </p>
            )}
            {company.email && (
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="font-medium">Email:</span> {company.email}
              </p>
            )}
            <div className="flex gap-4 text-xs pt-2">
              {company.ntn && (
                <span className="text-muted-foreground">
                  <span className="font-medium">NTN:</span> {company.ntn}
                </span>
              )}
              {company.gst && (
                <span className="text-muted-foreground">
                  <span className="font-medium">GST:</span> {company.gst}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No company details added</p>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={handleOpenEdit}
              className="mt-2 text-xs"
            >
              Add Company Details
            </Button>
          </div>
        )}
      </div>

      {/* Edit Company Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <TextInput
              value={companyData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              label="Company Name"
              placeholder="Enter company name"
              is_required={true}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                value={companyData.city}
                onChange={(e) => handleFieldChange("city", e.target.value)}
                label="City"
                placeholder="Enter city"
              />
              <TextInput
                value={companyData.country}
                onChange={(e) => handleFieldChange("country", e.target.value)}
                label="Country"
                placeholder="Enter country"
              />
            </div>

            <TextareaInput
              value={companyData.address}
              onChange={(e) => handleFieldChange("address", e.target.value)}
              label="Address"
              placeholder="Enter complete address"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PhoneInput
                value={companyData.phone}
                onChange={(value) => handleFieldChange("phone", value)}
                label="Phone Number"
                defaultCountry="PK"
              />
              <TextInput
                value={companyData.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                label="Email"
                placeholder="company@example.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                value={companyData.ntn}
                onChange={(e) => handleFieldChange("ntn", e.target.value)}
                label="NTN"
                placeholder="Enter NTN"
              />
              <TextInput
                value={companyData.gst}
                onChange={(e) => handleFieldChange("gst", e.target.value)}
                label="GST"
                placeholder="Enter GST"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveCompany}>
              Save Company Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
