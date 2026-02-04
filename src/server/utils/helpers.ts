import { FileObjFormDataSchema, FileObjSchema } from "../schemas/base-schema";

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export function formattedPaddingNumbers(index: number, padding: number = 2) {
  return String(index + 1).padStart(padding, "0");
}

export function isObject(val: unknown): val is object {
  return val instanceof Object && !Array.isArray(val) && typeof val !== "function";
}

export function encodeFileObjsToFormData(files: FileObjSchema[]): FileObjFormDataSchema[] {
  return files.map((f, i) => {
    if (f.id || !f.file) return { id: f.id };
    const fData = new FormData();
    fData.append(`${f.file?.name}-${i}`, f.file);

    return {
      id: f.id,
      formData: fData,
    };
  });
}

export function getFormatCardDate(dateStr?: string): string {
  if (!dateStr) return "-";

  let parsedDate = new Date(dateStr);

  // Fallback to manual parsing if the date is invalid
  if (isNaN(parsedDate.getTime())) {
    const match = dateStr.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (match) {
      const [_, month, day, year] = match;
      parsedDate = new Date(`${year}-${month}-${day}`);
    } else {
      return "-"; // or throw new Error("Unrecognized date format")
    }
  }

  return `${parsedDate.getDate().toString().padStart(2, "0")}/${(parsedDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${parsedDate.getFullYear()}`;
}

export function decodeFileObjsFromFormData(filesFormData: FileObjFormDataSchema[]) {
  return filesFormData.map((f) => ({
    id: f.id,
    file: firstValueInFormData(f.formData),
  }));
}

export function firstValueInFormData(formData?: FormData | null): FormDataEntryValue | undefined {
  return formData ? formData.entries().next().value?.[1] : undefined;
}
