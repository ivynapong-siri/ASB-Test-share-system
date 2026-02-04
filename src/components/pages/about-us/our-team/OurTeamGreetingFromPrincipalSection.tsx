import { SectionContainer } from "@/components/custom/section-container";
import { sanitizeHtmlContent } from "@/lib/sanitize-html";
import { SectionCardJson } from "@/server/serializers/card-serializer";
import { SectionJson } from "@/server/serializers/section-serializer";
import Image from "next/image";
interface OurTeamGreetingFromPrincipalProps {
  data: SectionJson;
}

const RenderPrincipal = ({ data }: { data: SectionCardJson[] }) => {
  return data.map((e) => (
    <div key={e.id} className="flex flex-col items-center gap-12 text-center">
      <div className="relative flex flex-col items-center">
        <div className="relative flex h-[300px] w-[358px] sm:h-[410px] sm:w-[540px]">
          <Image
            alt=""
            src={e.image?.imageMediumLargeUrl || e.image?.imageUrl || "/mock-image.jpg"}
            fill
            className="rounded-4xl object-cover object-top"
            priority
          />
        </div>
        <div className="bg-primary-200 absolute top-0 flex min-w-[370px] -translate-y-1/2 flex-col justify-center rounded-full px-6 py-2 text-center font-mono text-sm font-medium tracking-widest text-white uppercase md:text-base">
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizeHtmlContent(e.badge.replace("&", "&<br />").replace(" ", "&nbsp;")),
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-7 px-3">
        <h5 className="text-primary text-[2rem] font-semibold">{e.title}</h5>
        <p className="font-mono text-neutral-300">{e.description}</p>
      </div>
      <div className="flex flex-col items-center gap-3 text-neutral-300">
        <div className="relative h-20 w-[245px]">
          {e.image2?.imageUrl && <Image alt="" src={e.image2?.imageUrl} fill className="object-contain" priority />}
        </div>
        <h6 className="text-xl font-semibold">{e.title}</h6>
        <p className="font-mono">{e.badge}</p>
      </div>
    </div>
  ));
};

const OurTeamGreetingFromPrincipal = ({ data }: OurTeamGreetingFromPrincipalProps) => {
  return (
    <SectionContainer
      sectionClassName="w-full bg-gradient-to-b from-[#FFFFFF] to-[#F3F5F6]"
      className="gap-24 lg:pt-16 xl:flex-row"
    >
      <RenderPrincipal data={data.cards ?? []} />
    </SectionContainer>
  );
};

export default OurTeamGreetingFromPrincipal;
