import { LOCAL_ADMISSION_STORAGE_KEY } from "@/server/constants/constants";
import { draftAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
import { FileObjFormDataSchema } from "@/server/schemas/base-schema";
import { decodeFileObjsFromFormData } from "@/server/utils/helpers";

export async function saveAsDraftForm(saveAsDraftData: any, filesFormData: FileObjFormDataSchema[]) {
  try {
    const files = decodeFileObjsFromFormData(filesFormData);
    // console.log("ASSADSASD", files);
    const data = draftAdmissionFormSchema.strip().parse({ ...saveAsDraftData, files: files.slice(0, 1) });
    const serialized = JSON.stringify(data);
    localStorage.setItem(LOCAL_ADMISSION_STORAGE_KEY, serialized);
    console.log("Draft saved to local storage");
  } catch (error) {
    console.error("Failed to save draft:", error);
  }
}
