import { ReactNode } from "react";
import ASBRibbonText from "./asb-ribbon-text";
import { BoxBorderDashed } from "./box-border-dashed";
import LinkButton from "./buttons/link-button";

interface FormBoxProps {
  ribbonTitle: string;
  title: string;
  children: ReactNode;
  onClickPrevious: () => void;
  onClickNext: () => void;
  onClickSaveAsDraft: () => void;
  onSubmit: () => void;
  isLast: boolean;
}

const FormBox = ({
  isLast,
  children,
  ribbonTitle,
  title,
  onClickNext,
  onClickPrevious,
  onClickSaveAsDraft,
  onSubmit,
}: FormBoxProps) => {
  return (
    <BoxBorderDashed color="secondary" className="items-center gap-9 px-2 py-10 md:p-10 lg:items-start">
      <ASBRibbonText title={ribbonTitle} vectorHidden ribbonClassName="text-center" />
      <h4 className="text-primary-400 text-center text-xl font-semibold lg:text-[2rem]/[2rem]">{title}</h4>
      {children}
      <div className="flex w-full flex-col gap-3 font-mono font-medium md:flex-row">
        <div className="flex flex-row justify-between gap-3 md:justify-start">
          <LinkButton
            buttonText="previous"
            showIcon={false}
            linkClassName="border-primary hover:border-secondary border flex-1"
            variant={"ghost"}
            onClick={onClickPrevious}
          />
          <LinkButton
            buttonText={isLast ? "submit" : "next"}
            showIcon={isLast}
            onClick={isLast ? onSubmit : onClickNext}
            href={isLast ? "/admission/apply-now/thankyou" : ""}
          />
        </div>
        <div className="mx-auto md:mx-0 md:ml-auto">
          <LinkButton
            buttonText="save as draft"
            showIcon={false}
            linkClassName="border-primary hover:border-secondary border w-full md:w-fit"
            variant={"ghost"}
            onClick={() => {
              onClickSaveAsDraft();
            }}
          />
        </div>
      </div>
    </BoxBorderDashed>
  );
};

export default FormBox;
