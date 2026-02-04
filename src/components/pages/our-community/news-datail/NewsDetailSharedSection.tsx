"use client";

import LinkButton from "@/components/custom/buttons/link-button";

interface NewsDetailSharedSectionProps {
  buttonLabel?: string;
  title?: string;
  onOpen: () => void;
}

const NewsDetailSharedSection = ({ buttonLabel, title, onOpen }: NewsDetailSharedSectionProps) => {
  return (
    <div className="bg-secondary-300 mt-15 w-full">
      <div className="mx-auto my-5 w-full border-y border-dashed border-white py-9">
        <div className="mx-auto flex flex-col items-center gap-10 px-6 max-md:w-96 max-sm:w-full lg:flex-row lg:gap-20 xl:container xl:gap-80 xl:px-10">
          <p className="text-center font-sans font-semibold text-white md:text-xl lg:text-start">{title}</p>
          <LinkButton
            buttonText={buttonLabel ?? ""}
            href={""}
            linkButtonVariant={"secondary"}
            onClick={async (e) => {
              e?.preventDefault();
              onOpen();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailSharedSection;
