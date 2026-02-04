import HoverCardProgramSection from "@/components/shared/hover-card-program-section";
import { SectionJson } from "@/server/serializers/section-serializer";
import { usePathname } from "next/navigation";

interface HomeInnovativeProps {
  innovativeData: SectionJson;
}

const HomeInnovativeSection = ({ innovativeData }: HomeInnovativeProps) => {
  const pathname = usePathname();
  const isChinese = pathname.split("/")[1] === "zh-hans";

  return <HoverCardProgramSection data={innovativeData} cardAlignStart isChinese={isChinese} />;
};

export default HomeInnovativeSection;
