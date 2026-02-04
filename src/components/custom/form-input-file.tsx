import { FormControl, FormItem, FormLabel } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fileToBase64 } from "@/server/utils/helpers";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

interface FormInputFileProps {
  label: string;
  field: ControllerRenderProps<any, string>;
}

const FormInputFile: React.FC<FormInputFileProps> = ({ label, field }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = React.useState<string>("");

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div
          className="text-primary-400 flex h-20 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-[#1F94FB] bg-[#45A9E0]/20 text-sm"
          onClick={() => inputRef.current?.click()}
        >
          {fileName || "Attach your image here"}
          <Input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              setFileName(file?.name || "");

              if (file) {
                const base64 = await fileToBase64(file);
                field.onChange([
                  {
                    fileName: file.name,
                    contentType: file.type,
                    base64,
                  },
                ]);
              } else {
                field.onChange([]);
              }
            }}
            className="hidden"
          />
        </div>
      </FormControl>

      <div className="mt-2 flex flex-row items-center justify-between gap-5">
        <div className="text-primary-400 flex h-14 w-full items-center rounded-xl bg-white px-4 font-mono">
          {fileName ? fileName : "File Name"}
        </div>
        <Button type="button" onClick={() => inputRef.current?.click()}>
          Add File
        </Button>
      </div>
    </FormItem>
  );
};

export default FormInputFile;

// import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { Path, UseFormReturn } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import React from "react";
// import { UpdateAdmissionFormSchema } from "@/server/schemas/admission-forms/admission-form-schema";
// import { fileToBase64 } from "@/server/utils/helpers";

// interface FormInputFileProps {
//   label: string;
//   name: Path<UpdateAdmissionFormSchema>;
//   form: UseFormReturn<UpdateAdmissionFormSchema>;
// }

// const FormInputFile: React.FC<FormInputFileProps> = ({ label, name, form }) => {
//   const inputRef = React.useRef<HTMLInputElement | null>(null);
//   const [fileName, setFileName] = React.useState<string>("");

//   return (
//     <FormField
//       // control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <FormControl>
//             <div
//               className="text-primary-400 flex h-20 w-full items-center justify-center rounded-lg border border-dashed border-[#1F94FB] bg-[#45A9E0]/20 text-sm"
//               onClick={() => inputRef.current?.click()}
//             >
//               {fileName || "Attach your image here"}
//               <Input
//                 type="file"
//                 accept="image/*"
//                 ref={inputRef}
//                 onChange={async (e) => {
//                   console.log("This is e: ", e);
//                   const file = e.target.files?.[0];
//                   setFileName(file?.name || "");

//                   if (file) {
//                     const base64 = await fileToBase64(file);
//                     field.onChange([
//                       {
//                         fileName: file.name,
//                         contentType: file.type,
//                         base64,
//                       },
//                     ]);
//                   } else {
//                     field.onChange([]);
//                   }
//                 }}
//                 className="hidden"
//               />
//             </div>
//           </FormControl>

//           <div className="mt-2 flex flex-row items-center justify-between gap-5">
//             <div className="text-primary-400 flex h-14 w-full items-center rounded-xl bg-white px-4 font-mono">
//               {fileName ? fileName : "File Name"}
//             </div>
//             <Button type="button" onClick={() => inputRef.current?.click()}>
//               Add File
//             </Button>
//           </div>
//         </FormItem>
//       )}
//     />
//   );
// };

// export default FormInputFile;
