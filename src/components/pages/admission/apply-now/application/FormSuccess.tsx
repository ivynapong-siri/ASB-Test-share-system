import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import Image from "next/image";
const FormSuccess = () => {
  return (
    <SectionContainer
      sectionClassName="overflow-x-hidden overflow-y-hidden"
      className="z-10 items-center pt-72 pb-[320px] lg:pt-60 lg:pb-[700px]"
      vectorChildren={
        <>
          <div className="absolute top-48 -left-32 z-1 rotate-45 lg:top-40 lg:-left-32">
            <div className="relative h-32 w-44 lg:h-[265px] lg:w-[360px]">
              <Image alt="" src={"/shapes/shapes-13.svg"} fill />
            </div>
          </div>
          <div className="absolute top-[235px] left-[68px] z-1 rotate-12 rotate-y-180 lg:top-[250px] lg:left-[270px]">
            <div className="relative h-9 w-5 lg:h-[70px] lg:w-[42px]">
              <Image alt="" src={"/pencil.svg"} fill />
            </div>
          </div>

          <div className="absolute top-40 -right-28 z-1 -rotate-16 lg:top-64 lg:-right-32">
            <div className="relative h-32 w-44 lg:h-[265px] lg:w-[360px]">
              <Image alt="" src={"/shapes/shapes-12.svg"} fill />
            </div>
          </div>
          <div className="absolute top-[230px] right-12 z-1 lg:top-[380px] lg:right-[180px]">
            <div className="relative h-9 w-5 lg:h-[70px] lg:w-[42px]">
              <Image alt="" src={"/globe-ball-2.svg"} fill />
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -z-1 h-[350px] w-[320px] -translate-x-1/2 overflow-hidden lg:h-[1000px] lg:w-[1200px]">
            <Image
              alt=""
              src={
                "https://dcb9450325.nxcli.io/wp-content/uploads/2025/05/c622e1412e7806d3df8a4717fc455c75a4e55535-1.png"
              }
              fill
              className="object-cover object-top"
            />
          </div>
        </>
      }
    >
      <ASBRibbonText title="before you apply" />
      <h2 className="text-primary-400 text-center text-[2rem]/[2rem] font-semibold lg:text-[3.875rem]/[4.375rem]">
        Thank you for applying!
      </h2>
      <p className="text-neutral max-w-3xl pt-8 pb-20 text-center font-mono">
        We have received your application and will review it shortly.
      </p>
      <LinkButton buttonText="Back to Home Page" href="/home" />
    </SectionContainer>
  );
};

export default FormSuccess;
