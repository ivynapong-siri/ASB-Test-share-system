"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Fragment, useEffect } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";

import FormContent from "@/components/custom/form-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpdateAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
import { applyForBloodTypeOptions } from "@/shared/constants/enums";
import Link from "next/link";

interface FormStudentHealthProps {
  form: UseFormReturn<UpdateAdmissionFormSchema>;
}

interface RenderContractProps {
  index: number;
  form: UseFormReturn<UpdateAdmissionFormSchema>;
}

const openAndFill = () => {
  const win = window.open("https://www.asbsk.ac.th/admission/student-health-form/");
  win?.addEventListener("load", () => {
    try {
      const input = win?.document?.getElementById("input_3");
      if (input instanceof HTMLInputElement) {
        input.value = "pepe";
      }
    } catch (e) {
      console.error("Cannot access external page DOM due to cross-origin restrictions.");
    }
  });
};

const RenderContract = ({ index, form }: RenderContractProps) => {
  return (
    <Fragment key={index}>
      <p className="text-primary-400 text-base font-bold md:text-xl">{`Contact ${index + 1}`}</p>
      <FormField
        control={form.control}
        name={`studentHealth.alternatePersonEmergency.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl className="bg-white">
              <Input placeholder="Enter contact name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`studentHealth.alternatePersonEmergency.${index}.relationShip`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relationship to Student</FormLabel>
            <FormControl className="bg-white">
              <Input placeholder="Enter relationship" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`studentHealth.alternatePersonEmergency.${index}.mobileNumber`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mobile Number</FormLabel>
            <FormControl className="bg-white">
              <Input type="tel" placeholder="Enter mobile number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Fragment>
  );
};

const FormStudentHealth = ({ form }: FormStudentHealthProps) => {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "studentHealth.alternatePersonEmergency",
  });

  useEffect(() => {
    const existing = form.getValues("studentHealth.alternatePersonEmergency");
    if (!existing || existing.length === 0) {
      append({
        name: "",
        relationShip: "",
        mobileNumber: "",
      });
    }
  }, [append, form]);

  return (
    <>
      <FormContent formContentTitle="Student’s Information">
        <FormField
          control={form.control}
          name="studentHealth.studentInformation.bloodType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student’s Blood Type</FormLabel>
              <FormControl>
                <RadioGroup.Root
                  value={field.value?.toString()}
                  onValueChange={(val) => field.onChange(Number(val))}
                  className="flex flex-col space-y-2"
                >
                  {applyForBloodTypeOptions.map((option) => (
                    <RadioGroup.Item
                      key={option.value}
                      value={option.value}
                      id={`blood-type-${option.label.toLowerCase()}`}
                      className="flex cursor-pointer items-center space-x-2"
                    >
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                        {field.value?.toString() === option.value && <div className="h-2 w-2 rounded-full bg-black" />}
                      </div>
                      <label htmlFor={`blood-type-${option.label.toLowerCase()}`} className="cursor-pointer">
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
        <FormField
          control={form.control}
          name="studentHealth.studentInformation.foodRestriction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Restrictions</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter food restrictions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormContent>

      <FormContent formContentTitle="Alternate Person(s) To Contact in Case Of Emergency:">
        {fields.map((field, index) => (
          <>
            <RenderContract key={field.id} index={index} form={form} />

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

              {index === fields.length - 1 && (
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      name: "",
                      relationShip: "",
                      mobileNumber: "",
                    })
                  }
                  className="uppercase"
                >
                  Add alternate contact
                </Button>
              )}
            </div>
          </>
        ))}
      </FormContent>

      <div className="flex flex-col gap-2">
        <p>
          In addition to the documents above, please complete the Student Health Form to provide us with important
          health-related information about your child.
        </p>
        {/* TODO: Make it to link external and map data */}
        <p>
          You can access the Student Health Form by clicking
          <Link
            className="text-primary-200 hover:text-secondary pl-2 underline"
            onClick={openAndFill}
            href={"https://www.asbsk.ac.th/admission/student-health-form/"}
          >
            here
          </Link>
          .
        </p>
        <p>This form is vital for ensuring the well-being of your child while they are at our school.</p>
        <p>
          All documents and fees must be received by the Admission and Finance Office prior to the school starting date.
        </p>
      </div>
    </>
  );
};

export default FormStudentHealth;
