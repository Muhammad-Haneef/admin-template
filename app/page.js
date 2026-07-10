"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Save, FileText, Loader2 } from "lucide-react";
import { generateQuotationNumber } from "@/lib/quotation-utils";

// Import all quotation components
import QuotationHeader from "@/components/Quotation/QuotationHeader";
import QuotationMetaCard from "@/components/Quotation/QuotationMetaCard";
import CompanySelector from "@/components/Quotation/CompanySelector";
import ClientSelector from "@/components/Quotation/ClientSelector";
import ShippingDetails from "@/components/Quotation/ShippingDetails";
import CurrencySelector from "@/components/Quotation/CurrencySelector";
import QuotationItemsTable from "@/components/Quotation/QuotationItemsTable";
import SummarySidebar from "@/components/Quotation/SummarySidebar";
import ContactDetails from "@/components/Quotation/ContactDetails";
import TermsBuilder from "@/components/Quotation/TermsBuilder";
import AttachmentUploader from "@/components/Quotation/AttachmentUploader";
import { AdditionalNotes, AdditionalInfo } from "@/components/Quotation/AdditionalSections";
import AdvancedOptions from "@/components/Quotation/AdvancedOptions";

export default function QuotationBuilderPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSavingDraft, setIsSavingDraft] = React.useState(false);

  const methods = useForm({
    defaultValues: {
      // Header
      title: "QUOTATION",
      subtitle: "",
      logo: null,

      // Meta Information
      quotationNumber: generateQuotationNumber(),
      quotationDate: new Date(),
      dueDate: null,
      customFields: [],

      // Company & Client
      company: {
        name: "",
        address: "",
        city: "",
        country: "",
        phone: "",
        email: "",
        ntn: "",
        gst: ""
      },
      client: null,
      clientId: "",

      // Shipping
      shippingEnabled: false,
      shippingDetails: {
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        notes: ""
      },

      // Currency & Tax
      currency: "PKR",
      numberFormat: "1,234.00",

      // Items
      items: [],

      // Summary Calculations
      overallDiscountType: "percentage",
      overallDiscountValue: 0,
      additionalCharges: [],
      roundMode: "none",
      signature: null,

      // Contact Details
      contactDetails: {
        phone: "",
        mobile: "",
        email: "",
        website: "",
        address: ""
      },

      // Terms & Conditions
      terms: [],

      // Attachments
      attachments: [],

      // Additional Notes
      additionalNotes: "",

      // Additional Info
      additionalInfo: [],

      // Advanced Options
      advancedOptions: {
        displayUnit: true,
        mergeQuantity: false,
        showTaxSummary: true,
        hideCountry: false,
        hideOriginalImages: false,
        showThumbnails: true,
        showFullDescription: false,
        hideGroupSubtotal: false,
        showSKU: true,
        showSerialNumber: false,
        displayBatchDetails: false,
        showItemImages: true
      }
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Quotation Data:", data);
      
      // Here you would typically send data to your API
      // await api.createQuotation(data);
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      alert("Quotation created successfully!");
      
      // Optionally reset or redirect
      // methods.reset();
      // router.push("/quotations");
    } catch (error) {
      console.error("Error creating quotation:", error);
      alert("Failed to create quotation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      const data = methods.getValues();
      console.log("Saving draft:", data);
      
      // Save to localStorage as draft
      localStorage.setItem("quotation_draft", JSON.stringify(data));
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate save
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft.");
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handleSaveAndCreateNew = async () => {
    const data = methods.getValues();
    await onSubmit(data);
    
    // Reset form for new quotation
    methods.reset({
      ...methods.formState.defaultValues,
      quotationNumber: generateQuotationNumber()
    });
  };

  // Auto-save draft every 2 minutes
  React.useEffect(() => {
    const interval = setInterval(() => {
      const data = methods.getValues();
      localStorage.setItem("quotation_draft_autosave", JSON.stringify(data));
      console.log("Auto-saved draft");
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [methods]);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-background p-6">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-[1600px] mx-auto">
            {/* Header */}
            <QuotationHeader />

            {/* Quotation Information */}
            <div className="mb-6">
              <QuotationMetaCard />
            </div>

            {/* Company & Client - Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <CompanySelector />
              <ClientSelector />
            </div>

            {/* Shipping Details */}
            <div className="mb-6">
              <ShippingDetails />
            </div>

            {/* Currency & Configuration */}
            <div className="mb-6">
              <CurrencySelector />
            </div>

            {/* Main Content - Items Table & Summary Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Items Table - Takes 2/3 width on large screens */}
              <div className="lg:col-span-2">
                <QuotationItemsTable />
              </div>

              {/* Summary Sidebar - Takes 1/3 width on large screens */}
              <div className="lg:col-span-1">
                <SummarySidebar />
              </div>
            </div>

            {/* Contact Details */}
            <div className="mb-6">
              <ContactDetails />
            </div>

            {/* Terms & Conditions */}
            <div className="mb-6">
              <TermsBuilder />
            </div>

            {/* Attachments */}
            <div className="mb-6">
              <AttachmentUploader />
            </div>

            {/* Additional Notes */}
            <div className="mb-6">
              <AdditionalNotes />
            </div>

            {/* Additional Info */}
            <div className="mb-6">
              <AdditionalInfo />
            </div>

            {/* Advanced Options */}
            <div className="mb-6">
              <AdvancedOptions />
            </div>

            {/* Footer Action Buttons - Sticky */}
            <div className="sticky bottom-0 bg-background border-t border-border py-4 mt-8 -mx-6 px-6 z-10 shadow-lg">
              <div className="max-w-[1600px] mx-auto flex flex-wrap gap-3 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isSavingDraft || isSubmitting}
                  className="min-w-[140px]"
                >
                  {isSavingDraft ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Save as Draft
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveAndCreateNew}
                  disabled={isSubmitting || isSavingDraft}
                  className="min-w-[180px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save & Create New
                    </>
                  )}
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSavingDraft}
                  className="min-w-[160px] bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save & Continue
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Debug Panel - Only in development */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-8 bg-card rounded-xl border border-border p-6 shadow-sm">
                <h3 className="text-sm font-semibold mb-3 flex items-center justify-between">
                  <span>Form State (Development Only)</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => console.log("Current Form Data:", methods.watch())}
                    className="text-xs"
                  >
                    Log to Console
                  </Button>
                </h3>
                <div className="bg-zinc-950 text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-auto max-h-[400px]">
                  <pre>{JSON.stringify(methods.watch(), null, 2)}</pre>
                </div>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
    </AdminLayout>
  );
}
