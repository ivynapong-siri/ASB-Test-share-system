import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import BreadcrumbCustom from "@/components/custom/breadcrumb-custom";

const ApplicationFormTitle = () => {
  return (
    <>
      <BreadcrumbCustom />
      <div className="flex flex-col items-center py-20">
        <ASBRibbonText title="get started" />
        <h2 className="text-primary-400 text-[2rem]/[2rem] font-semibold lg:text-[3.875rem]/[4.375rem]">
          Application Form
        </h2>
      </div>
    </>
  );
};

export default ApplicationFormTitle;
