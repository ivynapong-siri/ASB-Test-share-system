"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  applyForAcademicYearOptions,
  applyForEnglishProficiencyOptions,
  applyForIntakeTermsOptions,
  applyGenderOptions,
} from "@/shared/constants/enums";

import FormContent from "@/components/custom/form-content";
import { Input } from "@/components/ui/input";
import { Country } from "@/server/models/model-types";
import { UpdateAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
import { UseFormReturn } from "react-hook-form";

interface FormStudentInformationProps {
  form: UseFormReturn<UpdateAdmissionFormSchema>;
  countries: Country[];
}

const FormStudentInformation = ({ form }: FormStudentInformationProps) => {
  return (
    <>
      <FormContent formContentTitle="name">
        <FormField
          control={form.control}
          name="studentInformation.name.firstName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl className="bg-white">
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="studentInformation.name.middleName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Middle Name (if present)</FormLabel>
                <FormControl className="bg-white">
                  <Input placeholder="Enter your middle name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="studentInformation.name.lastName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl className="bg-white">
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="studentInformation.name.nickName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nickname / Preferred Name</FormLabel>
                <FormControl className="bg-white">
                  <Input placeholder="Enter your nickname name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </FormContent>

      <FormContent formContentTitle="personal information">
        <FormField
          control={form.control}
          name="studentInformation.personalInformation.gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup.Root
                  value={field.value?.toString()}
                  onValueChange={(val) => field.onChange(Number(val))}
                  className="flex flex-col space-y-2"
                >
                  {applyGenderOptions.map((option) => (
                    <RadioGroup.Item
                      key={option.value}
                      value={option.value}
                      id={`gender-${option.label.toLowerCase()}`}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                        {field.value?.toString() === option.value && <div className="h-2 w-2 rounded-full bg-black" />}
                      </div>
                      <label htmlFor={`gender-${option.label.toLowerCase()}`} className="cursor-pointer">
                        {option.label}
                      </label>
                    </RadioGroup.Item>
                  ))}
                </RadioGroup.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full flex-col justify-between gap-9 md:flex-row md:gap-5">
          <FormField
            control={form.control}
            name="studentInformation.personalInformation.dateOfBirth"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Date of Birth</FormLabel>
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
              );
            }}
          />
          <FormField
            control={form.control}
            name="studentInformation.personalInformation.age"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl className="bg-white">
                    <Input
                      type="number"
                      placeholder="00"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="no-spinner"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <FormField
          control={form.control}
          name="studentInformation.personalInformation.nationality"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nationality</FormLabel>
                <FormControl className="bg-white">
                  <Input placeholder="Select Nationality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="studentInformation.personalInformation.religion"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Religion</FormLabel>
                <FormControl className="bg-white">
                  <Input placeholder="Enter your Religion" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </FormContent>
      <FormContent formContentTitle="Academic information">
        <FormField
          control={form.control}
          name="studentInformation.academicInformation.incomingGrade"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Incoming Grade</FormLabel>
                <FormControl className="bg-white">
                  <Input
                    type="number"
                    placeholder="Enter your grade"
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="no-spinner"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-col justify-between gap-9 md:flex-row md:gap-5">
          <FormField
            control={form.control}
            name="studentInformation.academicInformation.applyForAcademicYear"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Apply for Academic Year</FormLabel>
                  <FormControl>
                    <Select value={field.value?.toString()} onValueChange={(val) => field.onChange(Number(val))}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {applyForAcademicYearOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="studentInformation.academicInformation.intakeTerm"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Intake term</FormLabel>
                  <FormControl className="bg-white">
                    <Select value={field.value?.toString()} onValueChange={(val) => field.onChange(Number(val))}>
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select Term" />
                      </SelectTrigger>
                      <SelectContent>
                        {applyForIntakeTermsOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
      </FormContent>
      <FormContent formContentTitle="language proficiency">
        <FormField
          control={form.control}
          name="studentInformation.languageProficiency.firstLanguage"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>First Language</FormLabel>
                <FormControl className="bg-white">
                  <Input type="" placeholder="Enter your first language" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="studentInformation.languageProficiency.mainLanguage"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Main Languages Spoken and Used</FormLabel>
                <FormControl className="bg-white">
                  <Input type="" placeholder="Enter languages" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="studentInformation.languageProficiency.secondAndThirdLanguage"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Other Second and Third Languages</FormLabel>
                <FormControl className="bg-white">
                  <Input type="" placeholder="Enter Languages" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="studentInformation.languageProficiency.englishProficiency"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>English Proficiency</FormLabel>
                <FormControl>
                  <RadioGroup.Root
                    value={field.value?.toString()}
                    onValueChange={(val) => field.onChange(Number(val))}
                    className="flex flex-col space-y-2"
                  >
                    {applyForEnglishProficiencyOptions.map((option) => (
                      <RadioGroup.Item
                        key={option.value}
                        value={option.value}
                        id={`english-proficiency-${option.label.toLowerCase()}`}
                        className="flex cursor-pointer items-center space-x-2"
                      >
                        <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                          {field.value?.toString() === option.value && (
                            <div className="h-2 w-2 rounded-full bg-black" />
                          )}
                        </div>
                        <label htmlFor={`english-proficiency-${option.label.toLowerCase()}`} className="cursor-pointer">
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
      <FormContent formContentTitle="student permanent mailing address">
        <FormField
          control={form.control}
          name="studentInformation.studentPermanentMailingAddress.name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl className="bg-white">
                  <Input type="" placeholder="Enter the name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="studentInformation.studentPermanentMailingAddress.address"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl className="bg-white">
                  <Input type="" placeholder="Enter the address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <div className="flex flex-col justify-between gap-9 md:flex-row md:gap-5">
          <FormField
            control={form.control}
            name="studentInformation.studentPermanentMailingAddress.country"
            render={({ field }) => {
              return (
                <FormItem className="flex-1">
                  <FormLabel>Country</FormLabel>
                  <FormControl className="bg-white">
                    <Input type="" placeholder="Select Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="studentInformation.studentPermanentMailingAddress.postalCode"
            render={({ field }) => {
              return (
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
              );
            }}
          />
        </div>
        <div className="flex flex-row">
          <FormLabel>Phone Number</FormLabel>
          <FormField
            control={form.control}
            name="studentInformation.studentPermanentMailingAddress.phoneNumber.areaCode"
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
            name="studentInformation.studentPermanentMailingAddress.phoneNumber.number"
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

export default FormStudentInformation;
