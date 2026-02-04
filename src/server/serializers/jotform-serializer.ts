import { JOTFORMJson, JOTFORMPageJson } from "../types/jotform-type";

import { JOTFORMFieldType } from "@/shared/constants/enums";

export type JOTFORMDataJson = ReturnType<typeof serializeJOTFORM>;
export type JOTFORMDataPageJson = ReturnType<typeof serailizeJOTFORMPage>;

export function serailizeJOTFORMPage(data: JOTFORMPageJson) {
  return {
    title: data.title,
    questions: data.questions as JOTFORMDataJson[],
  };
}

export function serializeJOTFORM(data: JOTFORMJson) {
  const type = data.type as JOTFORMFieldType;
  const placeholder =
    type == JOTFORMFieldType.ControlHead || JOTFORMFieldType.ControlRadio || JOTFORMFieldType.ControlFileUpload
      ? data.text
      : type == JOTFORMFieldType.ControlDropdown
        ? data.emptyText
        : type == JOTFORMFieldType.ControlPhone
          ? data.compoundHint
          : type == JOTFORMFieldType.ControlNumber || JOTFORMFieldType.ControlTextbox
            ? data.hint
            : null;
  const options = typeof data.options === "string" && data.options.trim() !== "" ? data.options.split("|") : [];
  const extensions =
    typeof data.extensions === "string" && data.extensions.trim() !== "" ? data.extensions.split(",") : [];

  return {
    id: data.qid,
    fieldName: data.name,
    label: data.text,
    options,
    placeholder,
    alt: data.alt,
    type,
    allowMultiple: data.allowMultiple ?? null,
    buttonStyle: data.buttonStyle ?? null,
    buttonText: data.buttonText ?? null,
    description: data.description ?? null,
    extensions,
    fileLimit: data.fileLimit ?? null,
    labelAlign: data.labelAlign ?? null,
    limitFileSize: data.limitFileSize ?? null,
    maxFileSize: data.maxFileSize ?? null,
    minFileSize: data.minFileSize ?? null,
    name: data.name ?? null,
    order: data.order ?? null,
    required: data.required ?? null,
    shrink: data.shrink ?? null,
    subLabel: data.subLabel ?? null,
  };
}
