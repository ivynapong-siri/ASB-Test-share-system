"use client";

import { PatternStroke1, PatternStroke2 } from "@/components/shapes";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { CalendarProfileModal } from "@/components/icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { SectionProfileJson } from "@/server/serializers/profile-serializer";
import { XIcon } from "lucide-react";
import Image from "next/image";
import ASBRibbonText from "../asb-ribbon-text";
import HoverCard from "../cards/hover-card";
import ProfilePictureFrame from "../profile-picture-frame";
import SubstractBackground from "../substract-background";

interface ProfileModalProps {
  otherPersonHeader?: string;
  open: boolean;
  profiles: SectionProfileJson[];
  initialIndex: number;
  onClose: () => void;
}

const RenderHeaderSection = ({ profile, isMobile }: { profile: SectionProfileJson; isMobile?: boolean }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-col items-center lg:w-1/3 lg:items-start">
        <div className="relative mb-4 py-4">
          {profile?.imageUrl && (
            <ProfilePictureFrame
              borderClassName="-rotate-[8deg]"
              image={profile.imageUrl}
              topLeftIcon={<Image alt="knot-icon" src="/knot.svg" width={36} height={38} className="scale-x-[-1]" />}
              topLeftIconClassName="top-4 -left-8"
              imageClassName="object-cover h-[360px] object-top"
              imageWrapClassName="h-[290px] w-[230px] rounded-4xl lg:h-[290px] lg:w-[230px] xl:w-[300px] xl:h-[370px] 2xl:h-[370px] 2xl:w-[300px]"
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-6 pl-0 lg:w-2/3 lg:pl-10">
        <div>
          <ASBRibbonText
            title={profile.badgeLabel}
            vectorHidden={isMobile ? false : true}
            ribbonClassName="max-w-2/3"
          />
          <h2 className="text-primary my-2 text-3xl font-semibold">{`${profile?.firstName} ${profile?.middleName} ${profile?.lastName}`}</h2>
          <p className="font-mono text-sm text-neutral-300">{profile.position}</p>
        </div>

        <div className="flex gap-2">
          <div className="flex rounded-2xl border-1 px-2 py-1 font-mono text-sm text-neutral-300">
            <div className="relative size-5">
              <Image src={profile.nationalityFlagUrl} alt="" fill className="rounded-full object-cover" />
            </div>
            {profile.nationality && <span className="pl-2">{profile.nationality}</span>}
          </div>
          <div className="flex rounded-2xl border-1 px-2 py-1 font-mono text-sm text-neutral-300">
            <CalendarProfileModal />
            <span className="pl-1">{profile.experience}</span>
          </div>
        </div>

        <div className="bg-primary relative mt-4 rounded-4xl p-4 text-white shadow-md">
          <div className="rounded-3xl border border-dashed border-white px-4 py-6">
            <p className="font-serif text-2xl">{profile.quote}</p>
            <p className="mt-6 text-right text-base font-medium text-white">{profile.quoteAuthor}</p>
          </div>
          <div className="absolute -top-3 left-0 flex space-x-1">
            <Image src="/pin-quote.svg" alt="Pin" width={28} height={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

const RenderDetail = ({ profile }: { profile: SectionProfileJson }) => {
  return (
    <>
      <div className="mt-6 flex flex-col">
        <h3 className="text-primary-400 mb-2 text-3xl font-semibold">Qualifications</h3>
        <ul className="list-outside list-disc space-y-2 pl-5 font-mono text-sm text-neutral-900">
          {profile.qualifications
            .split(/\r?\n|•/)
            .filter(Boolean)
            .map((line, index) => (
              <li key={index}>{line.trim()}</li>
            ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col pb-12">
        <h3 className="text-primary-400 mb-2 text-3xl font-semibold">About the Teacher</h3>
        <p className="font-mono text-sm text-neutral-400">{profile.about}</p>
      </div>
    </>
  );
};

function useIsXL() {
  const [isXL, setIsXL] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const updateMatch = () => setIsXL(media.matches);

    updateMatch();
    media.addEventListener("change", updateMatch);
    return () => media.removeEventListener("change", updateMatch);
  }, []);

  return isXL;
}

const RenderOtherPersonGrid = ({
  profiles,
  currentProfileId,
  goToSlide,
  otherPersonHeader,
  containerWidth,
}: {
  profiles: SectionProfileJson[];
  currentProfileId: number;
  goToSlide: (index: number) => void;
  otherPersonHeader?: string;
  containerWidth?: number;
}) => {
  const isXL = useIsXL();

  const getRandomProfiles = (allProfiles: SectionProfileJson[]) => {
    const filtered = allProfiles.filter((p) => p.id !== currentProfileId);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const count = isXL ? 4 : 3;
    return shuffled.slice(0, count);
  };

  const displayedProfiles = getRandomProfiles(profiles);

  return (
    <div className="relative z-10 hidden lg:block">
      <div
        className="absolute left-1/2 h-full -translate-x-1/2 translate-y-1/11 rounded-b-[40px] bg-white lg:h-[500px] xl:h-[500px]"
        style={{ width: containerWidth }}
      />
      <PatternStroke1 className="absolute top-0 right-0 translate-x-[23%] translate-y-1/5 lg:h-[150px] lg:w-[334px]" />
      <PatternStroke2 className="absolute bottom-12 left-0 -translate-x-2/5 lg:h-[132px] lg:w-[180px]" />

      <div className="flex translate-y-1/12 flex-col gap-4">
        <p className="text-primary-400 z-1 pt-12 text-[2rem]/[2rem] font-semibold">
          {otherPersonHeader ?? "Others in the Team"}
        </p>
        <div className="hidden grid-cols-3 gap-4 py-6 lg:grid xl:grid-cols-4">
          {displayedProfiles.map((item, index) => (
            <div key={index}>
              <HoverCard
                title={`${item?.firstName} ${item?.middleName} ${item?.lastName}`}
                badgeLabel={item.badgeLabel}
                buttonLabel={item.buttonLabel}
                buttonLink={item.buttonUrl}
                personPosition={item.position}
                linkClassName="bg-white text-primary-400 pointer-events-auto hover:text-white py-5"
                iconClassName="text-secondary border-primary-400 group-hover/button:text-white group-hover/button:border-white "
                backgroundContent={
                  <Image
                    alt={`Profile-${item?.firstName}-${item?.id}`}
                    src={item?.imageUrl ?? "/mock-image.jpg"}
                    fill
                    className="rounded-4xl object-cover transition-all duration-300 ease-out group-hover:scale-120"
                  />
                }
                isHover={false}
                isProfile={true}
                contentClassName="p-4 gap-2 transform scale-75 left-0 origin-bottom-left min-w-60"
                titleClassName="text-[1.375rem]"
                className="h-[320px]"
                buttonAction={() => goToSlide(profiles.indexOf(item))}
                backgroundClassName="rounded-b-4xl"
                requiredHiddenStrip={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProfileModal = ({ open, profiles, initialIndex, onClose, otherPersonHeader }: ProfileModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const profile = profiles[currentIndex];
  const isMobile = useIsMobile();

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth + 128);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width + 128);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const goToSlide = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    const total = profiles.length;
    const newIndex = direction === "prev" ? (currentIndex - 1 + total) % total : (currentIndex + 1) % total;

    goToSlide(newIndex);
  };

  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
    }
  }, [open, initialIndex]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = "hidden";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, []);

  const RenderNavigateButton = ({ profiles }: { profiles: SectionProfileJson[] }) => {
    if (profiles.length <= 1) return null;

    return (
      <>
        <div
          onClick={() => handleNavigate("prev")}
          className="absolute top-[276px] -left-2 aspect-square w-[323px] -translate-1/2"
        >
          <Image src="/arrow-circular.svg" alt="arrow-circular-left" fill className="object-cover" />
        </div>
        <div
          onClick={() => handleNavigate("next")}
          className="absolute top-[278px] -right-2 z-10 aspect-square w-[323px] translate-x-1/2 -translate-y-1/2"
        >
          <Image src="/arrow-circular.svg" alt="arrow-circular-right" fill className="rotate-180 object-cover" />
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/80 p-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="relative m-auto min-h-full w-full max-w-screen rounded-4xl lg:max-w-[1150px]"
      >
        {/* Background stays behind */}
        <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full">
          <SubstractBackground height="154px" topAreaClassName="" />
        </div>

        {/* Close button */}
        <div
          onClick={() => onClose()}
          className="bg-primary absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full hover:cursor-pointer"
        >
          <XIcon className="size-8 text-white" />
        </div>

        <RenderNavigateButton profiles={profiles} />

        {/* All scrollable content */}
        <div ref={containerRef} className="p-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <RenderHeaderSection profile={profile} isMobile={isMobile} />
              <RenderDetail profile={profile} />
              {profiles.length > 1 && (
                <RenderOtherPersonGrid
                  containerWidth={width}
                  profiles={profiles}
                  goToSlide={goToSlide}
                  currentProfileId={profile.id}
                  otherPersonHeader={otherPersonHeader}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileModal;
