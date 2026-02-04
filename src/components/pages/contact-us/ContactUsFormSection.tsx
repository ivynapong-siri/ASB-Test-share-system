"use client";

import { BoxBorderDashed } from "@/components/custom/box-border-dashed";
import ContactUsCard from "@/components/custom/cards/contact-us-card";
import ContactBanner from "@/components/custom/contact-banner";
import { KnotIcon } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ContactUsPageJson } from "@/server/serializers/pages/contact-us-serializer";

interface ContactUsFormSectionProps {
  data: ContactUsPageJson;
}

const ContactUsFormSection = ({ data }: ContactUsFormSectionProps) => {
  const { navBox1 } = data;
  const isMobile = useIsMobile();

  const contactBanner = {
    description: [navBox1?.title ?? "", navBox1?.subtitle ?? ""],
    buttonText: navBox1?.buttonLabel ?? "",
    buttonHref: navBox1?.buttonUrl ?? "",
  };

  const titleClassName =
    "text-[1.25rem]/[1.625rem] font-semibold text-primary-400 md:text-[1.25rem]/[1.625rem] lg:max-w-[400px] lg:text-start lg:text-[1.75rem]/[2rem]";

  return (
    <div className="mt-10 flex flex-col gap-4 lg:flex-row">
      <div className="flex h-[1450px] flex-col items-start px-0 lg:h-[1250px] lg:w-1/2">
        <iframe src={`https://form.jotform.com/${data.jotformId}`} className="h-full w-full px-0" allowFullScreen />
      </div>

      <div className="flex flex-col items-start gap-4 lg:w-1/2">
        <BoxBorderDashed color="secondary" className="items-center px-4 py-10 lg:items-start lg:p-10">
          <h5 className={titleClassName}>{data.contactBoxTitle}</h5>
          <div className="mt-5 flex w-full flex-col gap-4 lg:mt-8 lg:flex-row">
            <ContactUsCard
              title={data.contactPhoneLabel}
              subtitle={data.contactPhoneNumber}
              titleClassName="text-lg lg:text-2xl text-center lg:text-start"
              className="h-46 w-full min-w-0 items-center justify-start p-5 text-center lg:h-54 lg:w-[210px] lg:items-start"
              subtitleClassName="lg:text-sm text-center lg:text-start break-words  break-all whitespace-normal [overflow-wrap:anywhere]"
              imageWrapperClassName="h-[40px]  w-[40px] justify-center"
              isPhoneNumber={true}
            />
            <ContactUsCard
              title={data.admissionHotlineLabel}
              subtitle={data.admissionHotlineNumber}
              titleClassName="text-lg lg:text-2xl text-center lg:text-start"
              className="h-46 w-full min-w-0 items-center justify-start p-5 lg:h-54 lg:w-[210px] lg:items-start"
              subtitleClassName="lg:text-sm text-center lg:text-start break-words break-all whitespace-normal [overflow-wrap:anywhere]"
              imageWrapperClassName="h-[40px] w-[40px]"
              isPhoneNumber={true}
            />
            <ContactUsCard
              title={data.contactEmailLabel}
              subtitle={data.contactEmail}
              titleClassName="text-lg lg:text-2xl text-center lg:text-start"
              className="h-46 w-full min-w-0 items-center justify-start p-5 lg:h-54 lg:w-[210px] lg:items-start"
              subtitleClassName="lg:text-sm text-center lg:text-start break-words break-all whitespace-normal [overflow-wrap:anywhere]"
              imageWrapperClassName="h-[40px] w-[40px]"
              isEmail={true}
            />
          </div>
        </BoxBorderDashed>
        <BoxBorderDashed color="secondary" className="relative items-center gap-9 px-4 py-10 lg:items-start lg:p-10">
          <KnotIcon className="absolute top-10 -right-4 h-10 w-10 lg:-top-4" />
          <h5 className={cn(titleClassName, "max-w-[200px] lg:max-w-[280px]")}>{data.contactBoxTitle2}</h5>
          <div className="flex w-full flex-col gap-8">
            <ContactUsCard
              title={data.addressLabel}
              subtitle={data.contactAddress}
              titleClassName="text-2xl text-center lg:text-start"
              subtitleClassName="text-center lg:text-start"
              className="flex h-70 w-full min-w-0 flex-col items-center justify-start gap-4 p-6 lg:h-auto lg:flex-row lg:items-start"
              imageWrapperClassName="h-[40px] w-[40px]"
            />
            <div className="h-[230px] overflow-hidden lg:h-[310px] lg:w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.187338007445!2d100.57531071959973!3d13.734681757808879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29e55699844f1%3A0xee67ed70da99dad0!2sXCL%20American%20School%20of%20Bangkok%20-%20Sukhumvit%20Campus!5e0!3m2!1sth!2sth!4v1757568209037!5m2!1sth!2sth"
                width="280"
                height="300"
                allowFullScreen
                loading="lazy"
                className="h-[230px] w-full rounded-4xl lg:h-[310px] lg:w-full"
              />
            </div>
          </div>
        </BoxBorderDashed>

        <div className="z-10 flex w-full">
          <ContactBanner
            buttonHref={contactBanner.buttonHref}
            buttonText={contactBanner.buttonText}
            className="md:rounded-full"
            customRx={isMobile ? 24 : 64}
          >
            <div className="flex flex-col text-start font-mono text-base/[1.625rem] max-md:hidden">
              <p>{contactBanner.description[0]}</p>
              <p>{contactBanner.description[1]}</p>
            </div>
            <p className="text-center font-mono text-base/[1.625rem] md:hidden">
              {contactBanner.description[0]} {contactBanner.description[1]}
            </p>
          </ContactBanner>
        </div>
      </div>
    </div>
  );
};

export default ContactUsFormSection;
