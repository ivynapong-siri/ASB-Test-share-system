"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CurrentLivingStatus, applyForCurrentLivingStatusOptions } from "@/shared/constants/enums";

import FormContent from "@/components/custom/form-content";
import { Input } from "@/components/ui/input";
import { UpdateAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
import { UseFormReturn } from "react-hook-form";

interface FormParentInformationProps {
  form: UseFormReturn<UpdateAdmissionFormSchema>;
}

const RenderCurrentLivingStatus = ({
  title,
  formName,
  form,
}: {
  title: string;
  formName: "fatherInformation" | "motherInformation" | "guardianInformation";
  form: UseFormReturn<UpdateAdmissionFormSchema>;
}) => {
  return (
    <>
      <h4 className="text-primary-400 text-xl font-semibold lg:text-[2rem]/[2rem]">{title}</h4>

      {/* Name Section */}
      <FormContent formContentTitle="name">
        <FormField
          control={form.control}
          name={`parentInformation.${formName}.name.firstName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`parentInformation.${formName}.name.middleName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name (if present)</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter your middle name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`parentInformation.${formName}.name.lastName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormContent>

      {/* Personal Information Section */}
      <FormContent formContentTitle="personal information">
        <FormField
          control={form.control}
          name={`parentInformation.${formName}.personalInformation.nationality`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Select Nationality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-between gap-9 md:flex-row md:gap-5">
          <FormField
            control={form.control}
            name={`parentInformation.${formName}.personalInformation.idNumber`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>ID Number</FormLabel>
                <FormControl className="bg-white">
                  <Input placeholder="Enter ID number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`parentInformation.${formName}.personalInformation.dateOfIssue`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Issue</FormLabel>
                <FormControl className="bg-white">
                  <Input
                    type="date"
                    max={new Date().toISOString().split("T")[0]}
                    value={field.value ? new Date(field.value).toISOString().split("T")[0] : ""}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      field.onChange(date);
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormContent>

      {/* Contact Information Section */}
      <FormContent formContentTitle="contact information">
        <div className="flex flex-row">
          <FormLabel>Phone Number</FormLabel>
          <FormField
            control={form.control}
            name={`parentInformation.${formName}.contactInformation.phoneNumber.areaCode`}
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
            name={`parentInformation.${formName}.contactInformation.phoneNumber.number`}
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
        {/* <FormField
          control={form.control}
          name={`parentInformation.${formName}.contactInformation.phoneNumber`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl className="bg-white">
                <Input type="tel" placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name={`parentInformation.${formName}.contactInformation.email`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl className="bg-white">
                <Input type="email" placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormContent>

      {/* Professional Information Section */}
      <FormContent formContentTitle="professional information">
        <FormField
          control={form.control}
          name={`parentInformation.${formName}.professionalInformation.companyName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter your company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`parentInformation.${formName}.professionalInformation.position`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter your position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`parentInformation.${formName}.professionalInformation.companyAddress`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter your company address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col justify-between gap-9 md:flex-row md:gap-5">
          <FormField
            control={form.control}
            name={`parentInformation.${formName}.professionalInformation.country`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl className="bg-white">
                  <Input placeholder="Select Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`parentInformation.${formName}.professionalInformation.postalCode`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl className="bg-white">
                  <Input
                    type="number"
                    placeholder="Enter Code"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                    className="no-spinner"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </FormContent>
    </>
  );
};

const FormParentInformation = ({ form }: FormParentInformationProps) => {
  const currentLivingStatus = form.watch("parentInformation.currentLivingStatus");

  return (
    <>
      <FormContent>
        <FormField
          control={form.control}
          name="parentInformation.currentLivingStatus"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Currently Living with</FormLabel>
                <FormControl>
                  <RadioGroup.Root
                    value={field.value?.toString()}
                    onValueChange={(val) => field.onChange(Number(val))}
                    className="flex flex-col space-y-2"
                  >
                    {applyForCurrentLivingStatusOptions.map((option) => (
                      <RadioGroup.Item
                        key={option.value}
                        value={option.value}
                        id={`living-${option.label.toLowerCase()}`}
                        className="flex cursor-pointer items-center space-x-2"
                      >
                        <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                          {field.value?.toString() === option.value && (
                            <div className="h-2 w-2 rounded-full bg-black" />
                          )}
                        </div>
                        <label htmlFor={`living-${option.label.toLowerCase()}`} className="cursor-pointer">
                          {option.label}
                        </label>
                      </RadioGroup.Item>
                    ))}
                  </RadioGroup.Root>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </FormContent>

      {(() => {
        switch (currentLivingStatus) {
          case CurrentLivingStatus.Parents:
            return (
              <>
                <RenderCurrentLivingStatus form={form} formName="fatherInformation" title="Father's Information" />
                <RenderCurrentLivingStatus form={form} formName="motherInformation" title="Mother's Information" />
              </>
            );
          case CurrentLivingStatus.Father:
            return <RenderCurrentLivingStatus form={form} formName="fatherInformation" title="Father's Information" />;
          case CurrentLivingStatus.Mother:
            return <RenderCurrentLivingStatus form={form} formName="motherInformation" title="Mother's Information" />;
          case CurrentLivingStatus.Guardian:
            return (
              <RenderCurrentLivingStatus form={form} formName="guardianInformation" title="Guardian's Information" />
            );
          default:
            return null;
        }
      })()}
    </>
  );
};

export default FormParentInformation;
