export type JOTFORMJson = JOTFORMFILEJson & {
  qid: string;
  name: string;
  text: string;
  alt: string;
  status: string;
  hint: string;
  options?: string;
  emptyText: string;
  inputMaskValue: string;
  order: string;
  inputMask: string;
  type: string;
  compoundHint: string;
};

export type JOTFORMPageJson = {
  title: string | null;
  questions: any[];
};

export type JOTFORMFILEJson = {
  allowMultiple?: string;
  buttonStyle?: string;
  buttonText?: string;
  description?: string;
  extensions?: string;
  fileLimit?: string;
  labelAlign?: string;
  limitFileSize?: string;
  maxFileSize?: string;
  minFileSize?: string;
  name?: string;
  order?: string;
  required?: string;
  shrink?: string;
  subLabel?: string;
  text?: string;
};
