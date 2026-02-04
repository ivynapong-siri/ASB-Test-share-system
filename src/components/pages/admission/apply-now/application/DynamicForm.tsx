import * as RadioGroup from "@radix-ui/react-radio-group";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JOTFORMDataJson, JOTFORMDataPageJson } from "@/server/serializers/jotform-serializer";

import FormBox from "@/components/custom/form-box";
import FormContent from "@/components/custom/form-content";
import FormInputFile from "@/components/custom/form-input-file";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { JOTFORMFieldType } from "@/shared/constants/enums";
import { HTMLInputTypeAttribute } from "react";
import { ControllerRenderProps } from "react-hook-form";

interface DynamicFormProps {
  titlePage: string;
  ribbonText: string;
  data: JOTFORMDataPageJson[];
  handleNext: () => void;
  handlePrevious: () => void;
  handleSaveAsDraft: () => void;
  isLast: boolean;
}

const jotformTypeToInputType: Record<JOTFORMFieldType, React.InputHTMLAttributes<HTMLInputElement>["type"]> = {
  [JOTFORMFieldType.ControlTextbox]: "text",
  [JOTFORMFieldType.ControlNumber]: "number",
  [JOTFORMFieldType.ControlPhone]: "tel",
  [JOTFORMFieldType.ControlEmail]: "email",
  [JOTFORMFieldType.ControlDropdown]: "text",
  [JOTFORMFieldType.ControlRadio]: "text",
  [JOTFORMFieldType.ControlFullname]: "text", // might be multiple inputs
  [JOTFORMFieldType.ControlAddress]: "text",
  [JOTFORMFieldType.ControlDate]: "date",
  [JOTFORMFieldType.ControlTextarea]: "text", // consider using <textarea>
  [JOTFORMFieldType.ControlFileUpload]: "file",
  [JOTFORMFieldType.ControlHidden]: "hidden",
  [JOTFORMFieldType.ControlHead]: "text",
  [JOTFORMFieldType.ControlButton]: "submit",
  [JOTFORMFieldType.ControlPageBreak]: "text",
};

const DynamicFormPage = ({
  ribbonText,
  titlePage,
  data,
  handleNext,
  handlePrevious,
  handleSaveAsDraft,
  isLast,
}: DynamicFormProps) => {
  return (
    <FormBox
      ribbonTitle={ribbonText}
      title={titlePage}
      isLast={isLast}
      onClickNext={handleNext}
      onClickPrevious={handlePrevious}
      onClickSaveAsDraft={() => {
        handleSaveAsDraft();
      }}
      onSubmit={() => console.log("submit")} // TODO: Add submit form
    >
      {data.map((e) => (
        <DynamicFormField data={e} />
      ))}
    </FormBox>
  );
};

const TextFormField = ({
  field,
  inputType,
  placeholder,
}: {
  field: ControllerRenderProps<any, string>;
  inputType: HTMLInputTypeAttribute;
  placeholder?: string;
}) => {
  return (
    <Input
      type={inputType}
      placeholder={placeholder ?? ""}
      className={cn("bg-white", inputType === "number" && "no-spinner")}
      {...field}
    />
  );
};

const RadioFormField = ({ data, field }: { data: JOTFORMDataJson; field: ControllerRenderProps<any, string> }) => {
  const { options = [], fieldName } = data;

  return (
    <RadioGroup.Root
      value={field.value?.toString() ?? ""}
      onValueChange={(val) => field.onChange(val)}
      className="flex flex-col space-y-2"
    >
      {options.map((option) => {
        const id = `${fieldName}-${option.toLowerCase().replace(/\s+/g, "-")}`;
        return (
          <div key={option} className="flex items-center space-x-2">
            <RadioGroup.Item
              value={option}
              id={id}
              className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400"
            >
              {field.value === option && <div className="h-2 w-2 rounded-full bg-black" />}
            </RadioGroup.Item>
            <label htmlFor={id} className="cursor-pointer">
              {option}
            </label>
          </div>
        );
      })}
    </RadioGroup.Root>
  );
};

const SelectFormField = ({
  options,
  field,
  placeholder,
}: {
  options: string[];
  placeholder: string;
  field: ControllerRenderProps<any, string>;
}) => {
  return (
    <Select value={field.value?.toString()} onValueChange={(val) => field.onChange(Number(val))}>
      <SelectTrigger className="bg-white">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const DynamicFormField = ({ data }: { data: JOTFORMDataPageJson }) => {
  return (
    <FormContent formContentTitle={data.title ?? ""}>
      {data.questions.map((e) => (
        <FormField
          //   control={form.control}
          key={e.id}
          name={e.fieldName}
          render={({ field }) => {
            const inputType = jotformTypeToInputType[e.type as JOTFORMFieldType] ?? "text";

            const renderInput = () => {
              switch (e.type) {
                case JOTFORMFieldType.ControlRadio:
                  return <RadioFormField data={e} field={field} />;
                case JOTFORMFieldType.ControlNumber:
                case JOTFORMFieldType.ControlPhone:
                case JOTFORMFieldType.ControlEmail:
                case JOTFORMFieldType.ControlTextbox:
                case JOTFORMFieldType.ControlDate:
                  return <TextFormField field={field} inputType={inputType} placeholder={e.placeholder ?? ""} />;
                case JOTFORMFieldType.ControlDropdown:
                  return <SelectFormField options={e.options} field={field} placeholder={e.placeholder ?? ""} />;
                case JOTFORMFieldType.ControlFileUpload:
                  return <FormInputFile label={e.label} field={field} />;

                default:
                  return <TextFormField field={field} inputType="text" placeholder={e.placeholder ?? ""} />;
              }
            };

            return (
              <FormItem>
                {e.type !== JOTFORMFieldType.ControlFileUpload && <FormLabel>{e.label}</FormLabel>}
                <FormControl>{renderInput()}</FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      ))}
    </FormContent>
  );
};

export default DynamicFormPage;
