"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn, useFieldArray } from "react-hook-form";

import FormContent from "@/components/custom/form-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpdateAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
import { useEffect } from "react";

interface FormPreviousSchoolInformationProps {
  form: UseFormReturn<UpdateAdmissionFormSchema>;
}

const FormPreviousSchoolInformation = ({ form }: FormPreviousSchoolInformationProps) => {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "previousSchoolInformation.formerSchool",
  });

  useEffect(() => {
    const existing = form.getValues("previousSchoolInformation.formerSchool");
    if (!existing || existing.length === 0) {
      append({
        name: "",
        yearOfStudy: undefined,
        location: "",
      });
    }
  }, [append, form]);

  const renderFormerSchoolFields = () =>
    fields.map((field, index) => (
      <FormContent key={field.id} formContentTitle={`Former School ${index + 1}`} className="font-mono font-medium">
        <FormField
          control={control}
          name={`previousSchoolInformation.formerSchool.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>School Name</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter school name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`previousSchoolInformation.formerSchool.${index}.yearOfStudy`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of Study</FormLabel>
              <FormControl className="bg-white">
                <Input
                  type="text"
                  placeholder="Enter year of study"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === "" ? undefined : Number(value));
                  }}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`previousSchoolInformation.formerSchool.${index}.location`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-3">
          {fields.length > 1 && (
            <Button
              type="button"
              onClick={() => remove(index)}
              className="border-primary text-primary-400 hover:border-secondary border bg-white pr-3 uppercase hover:text-white"
            >
              Remove
            </Button>
          )}

          <Button
            type="button"
            onClick={() =>
              append({
                name: "",
                yearOfStudy: undefined,
                location: "",
              })
            }
            className="uppercase"
          >
            Add past education
          </Button>
        </div>
      </FormContent>
    ));

  return (
    <>
      {renderFormerSchoolFields()}

      <FormContent formContentTitle="referrer contact details">
        <FormField
          control={form.control}
          name="previousSchoolInformation.referrerContactDetails.name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className="bg-white">
                  <Input placeholder="Enter name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="previousSchoolInformation.referrerContactDetails.email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl className="bg-white">
                  <Input type="email" placeholder="example@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-row">
          <FormLabel>Phone Number</FormLabel>
          <FormField
            control={form.control}
            name="previousSchoolInformation.referrerContactDetails.phoneNumber.areaCode"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl className="bg-white">
                    <Input
                      placeholder="Enter area code"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Area Code</FormLabel>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="previousSchoolInformation.referrerContactDetails.phoneNumber.number"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl className="bg-white">
                    <Input
                      type="tel"
                      placeholder="Enter phone number"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormLabel className="text-sm">Phone Number</FormLabel>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </FormContent>
    </>
  );
};

export default FormPreviousSchoolInformation;
