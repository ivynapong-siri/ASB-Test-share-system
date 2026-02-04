import { BoxBorderDashed } from "@/components/custom/box-border-dashed";
import { BookATourPageJson } from "@/server/serializers/pages/book-a-tour-serializer";

interface BookATourFormSectionProps {
  data: BookATourPageJson;
}

const BookATourFormSection = ({ data }: BookATourFormSectionProps) => {
  return (
    <BoxBorderDashed
      color="secondary"
      className="h-[2500px] items-center gap-9 px-2 py-10 md:h-[2040px] md:p-10 lg:h-[2200px]"
    >
      <div className="h-[2500px] w-full overflow-hidden md:h-[2040px] lg:h-[2200px]">
        <iframe
          src={`https://form.jotform.com/${data.jotformId}`}
          frameBorder="0"
          className="h-full w-full"
          allowFullScreen
        />
      </div>
    </BoxBorderDashed>
  );
};

export default BookATourFormSection;
