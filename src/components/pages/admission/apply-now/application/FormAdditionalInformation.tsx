"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn, useFieldArray } from "react-hook-form";

import FormContent from "@/components/custom/form-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UpdateAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
import { useEffect } from "react";

interface FormAdditionalInformationProps {
  form: UseFormReturn<UpdateAdmissionFormSchema>;
}

const FormAdditionalInformation = ({ form }: FormAdditionalInformationProps) => {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "additionalInformation.brotherSisterAttending.detail",
  });

  useEffect(() => {
    const existing = form.getValues("additionalInformation.brotherSisterAttending.detail");
    if (!existing || existing.length === 0) {
      append({
        name: "",
        grade: undefined,
      });
    }
  }, [append, form]);

  return (
    <>
      <FormContent>
        <FormField
          control={form.control}
          name="additionalInformation.childProblem.learningSupport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Has your child received any learning support from a psychologist, psychiatrist or other specialist?
              </FormLabel>
              <FormControl>
                <RadioGroup.Root
                  value={field.value?.toString()} // converts true/false to "true"/"false"
                  onValueChange={(val) => field.onChange(val === "true")} // converts string back to boolean
                  className="flex flex-col space-y-2"
                >
                  <RadioGroup.Item value="true" id="learning-support-yes" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === true && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="learning-support-yes" className="cursor-pointer">
                      Yes
                    </label>
                  </RadioGroup.Item>

                  <RadioGroup.Item value="false" id="learning-support-no" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === false && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="learning-support-no" className="cursor-pointer">
                      No
                    </label>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalInformation.childProblem.learningSupportElaborate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please Elaborate</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalInformation.childProblem.childBehavior"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Has your child’s behaviour been any cause for concern?</FormLabel>
              <FormControl>
                <RadioGroup.Root
                  value={field.value?.toString()}
                  onValueChange={(val) => field.onChange(val === "true")}
                  className="flex flex-col space-y-2"
                >
                  <RadioGroup.Item value="true" id="child-behavior-yes" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === true && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="child-behavior-yes" className="cursor-pointer">
                      Yes
                    </label>
                  </RadioGroup.Item>

                  <RadioGroup.Item value="false" id="child-behavior-no" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === false && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="child-behavior-no" className="cursor-pointer">
                      No
                    </label>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalInformation.childProblem.childBehaviorElaborate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Please Elaborate</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormContent>

      <FormContent>
        <FormField
          control={form.control}
          name="additionalInformation.specialCare.physicalHealthLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Physical Health Limitations</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalInformation.specialCare.dietaryRequirement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special dietary requirements</FormLabel>
              <FormControl className="bg-white">
                <Input placeholder="Enter information" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormContent>

      <FormContent>
        <FormField
          control={form.control}
          name="additionalInformation.service.requireSchoolBusService"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Will the student require school bus service?</FormLabel>
              <FormControl>
                <RadioGroup.Root
                  value={field.value?.toString()}
                  onValueChange={(val) => field.onChange(val === "true")}
                  className="flex flex-col space-y-2"
                >
                  <RadioGroup.Item value="true" id="will-student-yes" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === true && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="will-student-yes" className="cursor-pointer">
                      Yes
                    </label>
                  </RadioGroup.Item>

                  <RadioGroup.Item value="false" id="will-student-no" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === false && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="will-student-no" className="cursor-pointer">
                      No
                    </label>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalInformation.service.employerPaySchoolFees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Will the employer of either or both parents pay school fees?</FormLabel>
              <FormControl>
                <RadioGroup.Root
                  value={field.value?.toString()}
                  onValueChange={(val) => field.onChange(val === "true")}
                  className="flex flex-col space-y-2"
                >
                  <RadioGroup.Item value="true" id="will-employer-yes" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === true && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="will-employer-yes" className="cursor-pointer">
                      Yes
                    </label>
                  </RadioGroup.Item>

                  <RadioGroup.Item value="false" id="will-employer-no" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === false && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="will-employer-no" className="cursor-pointer">
                      No
                    </label>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionalInformation.service.employerInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>If yes, please specify employer’s information</FormLabel>
              <FormControl className="bg-white">
                <Input
                  disabled={!form.watch("additionalInformation.service.employerPaySchoolFees")}
                  placeholder="Enter message"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </FormContent>
      <FormContent>
        <FormField
          control={form.control}
          name="additionalInformation.brotherSisterAttending.brotherSister"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Does applicant have brother(s)/sister(s) attending XCL ASB? If yes, please list names and grades.
              </FormLabel>
              <FormControl>
                <RadioGroup.Root
                  value={field.value?.toString()}
                  onValueChange={(val) => field.onChange(val === "true")}
                  className="flex flex-col space-y-2"
                >
                  <RadioGroup.Item value="true" id="brother-sister-yes" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === true && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="brother-sister-yes" className="cursor-pointer">
                      Yes
                    </label>
                  </RadioGroup.Item>

                  <RadioGroup.Item value="false" id="brother-sister-no" className="flex items-center space-x-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400">
                      {field.value === false && <div className="h-2 w-2 rounded-full bg-black" />}
                    </div>
                    <label htmlFor="brother-sister-no" className="cursor-pointer">
                      No
                    </label>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("additionalInformation.brotherSisterAttending.brotherSister") && (
          <div className="mt-4 space-y-4">
            {fields.map((field, index) => (
              <div className="flex flex-col gap-7 md:gap-9">
                <div key={field.id} className="flex items-end gap-4">
                  <FormField
                    control={form.control}
                    name={`additionalInformation.brotherSisterAttending.detail.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Name</FormLabel>
                        <FormControl className="bg-white">
                          <Input placeholder="Enter name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`additionalInformation.brotherSisterAttending.detail.${index}.grade`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Grade</FormLabel>
                        <FormControl className="bg-white">
                          <Input placeholder="Enter grade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  className="border-primary text-primary-400 hover:border-secondary w-fit border bg-white pr-3 uppercase hover:text-white"
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                append({
                  name: "",
                  grade: undefined,
                })
              }
            >
              Add Another
            </Button>
          </div>
        )}
      </FormContent>
    </>
  );
};

export default FormAdditionalInformation;
