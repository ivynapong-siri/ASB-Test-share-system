"use client";

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import LinkButton from "@/components/custom/buttons/link-button";
import FormContent from "@/components/custom/form-content";
import { Checkbox } from "@/components/ui/checkbox";
import { UpdateAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
import { UseFormReturn } from "react-hook-form";

interface FormSummaryProps {
  form: UseFormReturn<UpdateAdmissionFormSchema>;
}

const FormSummary = ({ form }: FormSummaryProps) => {
  return (
    <FormContent formContentTitle="form submission">
      <p>
        All documents and fees must be received by the Admission and Finance Office prior to the school starting date.
      </p>
      <p>
        To the collection, use, and disclosure, including cross-border transfer of my personal data and my children's
        personal data, for the purpose of enrollment. We may reach out to your child's previous school for information
        verification and to gather further details.*
      </p>
      <FormField
        control={form.control}
        name="summary.consent"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox id="summary-consent" checked={field.value} onCheckedChange={(val) => field.onChange(!!val)} />
            </FormControl>
            <label htmlFor="summary-consent" className="cursor-pointer text-sm leading-none font-medium">
              I consent
            </label>
            <FormMessage />
          </FormItem>
        )}
      />

      <LinkButton
        buttonText="preview application pdf"
        variant={"ghost"}
        showIcon={false}
        linkClassName="border-primary border hover:border-secondary"
      />
    </FormContent>
  );
};

export default FormSummary;
