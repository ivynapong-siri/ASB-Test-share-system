import ASBRibbonText from "@/components/custom/asb-ribbon-text";
import { BoxBorderDashed } from "@/components/custom/box-border-dashed";
import LinkButton from "@/components/custom/buttons/link-button";
import { SectionContainer } from "@/components/custom/section-container";
import { cn } from "@/lib/utils";
import { MockStartToApplyData } from "@/shared/constants/mock-data";
import Image from "next/image";
interface StartToApplyProps {
  onStart: () => void;
}

const RenderDetailBox = ({ data }: { data: any[] }) => {
  return (
    <BoxBorderDashed color="secondary" borderRadius={28} className="w-fit gap-0 divide-y-[1px] divide-[#d0d6e2] px-5">
      {data.map((e, index) => (
        <div
          key={e.id}
          className={cn(
            "text-primary flex flex-col gap-4 py-7",
            index == 0 && "pt-5",
            index == data.length - 1 && "pb-5"
          )}
        >
          <p className="text-xl font-semibold">{e.title}</p>
          <p className="font-mono">{e.description}</p>
        </div>
      ))}
    </BoxBorderDashed>
  );
};

const StartToApply = ({ onStart }: StartToApplyProps) => {
  return (
    <SectionContainer
      sectionClassName="overflow-x-hidden overflow-y-hidden"
      className="z-10 items-center pt-72 pb-[320px] lg:pt-60 lg:pb-[500px]"
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
          <div className="absolute bottom-0 left-1/2 -z-1 h-[250px] w-screen -translate-x-1/2 overflow-hidden lg:h-[600px] lg:w-[1200px] lg:translate-y-1/6">
            <Image
              alt=""
              src={
                "https://dcb9450325.nxcli.io/wp-content/uploads/2025/04/e177df2ea9f018e9af6446fa7e22d79e75fc0f53-1-scaled.png"
              }
              fill
              className="object-cover object-top"
            />
          </div>
        </>
      }
    >
      <ASBRibbonText title="before you apply" />
      <div className="text-primary-400 text-center text-[2rem]/[2rem] font-semibold lg:text-[3.875rem]/[4.375rem]">
        <h2>
          Welcome to the <br />
          ASB Application Portal
        </h2>
      </div>
      <p className="text-neutral max-w-3xl pt-8 pb-12 text-center font-mono">
        Thank you for your interest in joining ASB! Our application process is designed to be simple and
        straightforward. Before you begin, please review the following:
      </p>
      <RenderDetailBox data={MockStartToApplyData} />
      <p className="max-w-3xl py-12 text-center font-mono font-light">
        When you're ready, click "<span className="text-primary-400 font-bold">Start Application</span>" to begin. If
        you have any questions, feel free to contact our admissions team.
      </p>
      <LinkButton buttonText="start application" onClick={onStart} />
    </SectionContainer>
  );
};

export default StartToApply;
