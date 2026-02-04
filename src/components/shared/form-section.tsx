import Image from "next/image";
import LinkButton from "../custom/buttons/link-button";

const FormSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3">
      <div className="bg-primary-gray center border-y-1 border-r-1 px-8 py-16">
        <div className="relative h-24">
          <Image alt="" src={"/enquire-icon.svg"} fill className={"rounded-t-[20px]"} />
        </div>
        <p className="text-primary text-center text-[32px] font-semibold">Enquire</p>
        <div className="flex justify-center pt-6">
          <LinkButton
            buttonText="learn more"
            href={""}
            linkClassName=""
            iconClassName="size-5 p-1 text-white border border-dashed border-white rounded-full"
          />
        </div>
      </div>
      <div className="bg-primary-gray border-y-1 border-r-1 px-8 py-16">
        <div className="relative h-24">
          <Image alt="" src={"/booking-icon.svg"} fill className={"rounded-t-[20px]"} />
        </div>
        <p className="text-primary text-center text-[32px] font-semibold">Book a Tour</p>
        <div className="flex justify-center pt-6">
          <LinkButton
            buttonText="learn more"
            href={""}
            linkClassName=""
            iconClassName="size-5 p-1 text-white border border-dashed border-white rounded-full"
          />
        </div>
      </div>
      <div className="bg-primary-gray border-y-1 px-8 py-16">
        <div className="relative h-24">
          <Image alt="" src={"/apply-icon.svg"} fill className={"h-full w-full rounded-t-[20px]"} />
        </div>
        <p className="text-primary text-center text-[32px] font-semibold">Apply</p>
        <div className="flex justify-center pt-6">
          <LinkButton
            buttonText="learn more"
            href={""}
            linkClassName=""
            iconClassName="size-5 p-1 text-white border border-dashed border-white rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
export default FormSection;
