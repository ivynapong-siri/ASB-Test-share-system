import React, { useEffect, useRef, useState } from "react";
import { ASBTitleBottomWhiteVector, ASBTitleBottomWhiteVectorMobile, ASBVector, ASBVectorTitleMobile } from "../icons";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LinkButton from "../custom/buttons/link-button";
import { HighlightCircleVector } from "../vectors";
import { AnimatedFadeInAndOutOnScroll } from "./animation-section";

interface VideoHeroProps {
  imageSrc?: string;
  imageMobileSrc?: string;
  imageClassName?: string;
  videoSource?: string;
  titleText: string;
  descriptionText: string;
  descriptionClassName?: string;
  isHaveHighlight?: boolean;
  highlightText?: string;
  isHaveButton?: boolean;
  buttonLabel?: string;
  buttonUrl?: string;
  isHome?: boolean;
  titleClassName?: string;
}

const VideoHeroSection = ({
  videoSource,
  titleText,
  descriptionText,
  descriptionClassName,
  isHaveHighlight,
  highlightText,
  isHaveButton,
  buttonLabel,
  buttonUrl,
  imageSrc,
  imageMobileSrc,
  imageClassName,
  isHome = false,
  titleClassName,
}: VideoHeroProps) => {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    // Track user interaction to enable video loading
    const handleUserInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("scroll", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("scroll", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const handleLoadedData = () => {
        setVideoLoaded(true);
        console.log("✅ Video loaded successfully (may be from cache)");
        if (isInView) {
          video.play().catch(console.error);
        }
      };

      const handleError = (error: Event) => {
        setVideoLoaded(false);
        console.error("❌ Video loading failed:", error);
      };

      const handleProgress = () => {
        if (video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          const duration = video.duration;
          if (bufferedEnd > 0 && duration > 0) {
            const percentBuffered = (bufferedEnd / duration) * 100;
            console.log(`📊 Video buffered: ${percentBuffered.toFixed(1)}%`);
          }
        }
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("error", handleError);

      // Load video when it comes into view
      if (isInView && video.readyState === 0) {
        console.log("📥 Loading video...");
        video.load();
      }

      if (video.readyState >= 2) {
        setVideoLoaded(true);
        console.log("✅ Video already loaded");
        if (isInView) {
          video.play().catch(console.error);
        }
      }

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("error", handleError);
        video.removeEventListener("progress", handleProgress);
      };
    }
  }, [isInView, userInteracted]);

  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      const video = videoRef.current;
      if (isInView) {
        video.play().catch(console.error);
      } else {
        video.pause();
      }
    }
  }, [isInView, videoLoaded]);

  const BackgroundOverlay = () => {
    return (
      <div className="via-primary/30 to-primary absolute inset-0 z-0 bg-gradient-to-b from-transparent opacity-100 transition-opacity duration-300" />
    );
  };

  const RightSideVector = () => {
    return (
      <>
        <ASBTitleBottomWhiteVector className="absolute -right-2/3 -bottom-[1px] z-1 h-25 max-sm:hidden md:-right-1/3 md:h-auto lg:right-0" />
        <ASBTitleBottomWhiteVectorMobile className="absolute right-0 bottom-0 z-1 h-auto md:hidden" />
      </>
    );
  };

  return (
    <div className="relative h-[1000px] w-full max-xl:mt-[95px] xl:h-[1080px]">
      {videoSource ? (
        <>
          <video
            ref={videoRef}
            id="background-video"
            className="top-0 z-0 float-left h-full w-full object-cover"
            playsInline
            loop
            autoPlay
            muted
            preload="none"
            poster={imageSrc || imageMobileSrc || undefined}
            style={{ display: isMobile ? "none" : "block" }}
            suppressHydrationWarning
          >
            <source src={videoSource} type="video/mp4" />
          </video>
          {/* Show poster image while video is loading OR always on mobile */}
          {(isMobile || !videoLoaded) && (imageSrc || imageMobileSrc) && (
            <Image
              alt=""
              src={isMobile && imageMobileSrc ? imageMobileSrc : (imageSrc ?? "/mock-image.jpg")}
              fill
              priority
              quality={75}
              sizes="100vw"
              className={cn("absolute inset-0 object-cover", imageClassName)}
              placeholder="blur"
              blurDataURL={"/blur-image.jpg"}
            />
          )}
        </>
      ) : (
        <Image
          alt=""
          src={isMobile && imageMobileSrc ? imageMobileSrc : (imageSrc ?? "/mock-image.jpg")}
          fill
          priority
          quality={85}
          sizes="100vw"
          className={cn("object-cover", imageClassName)}
          placeholder="blur"
          blurDataURL={"/blur-image.jpg"}
        />
      )}
      <ASBVector
        fill="#002A63"
        className="absolute -bottom-5 -left-20 z-10 hidden h-20 w-fit sm:-left-20 md:-bottom-7 lg:-bottom-10 lg:left-0 lg:block"
      />
      <ASBVectorTitleMobile className="absolute -bottom-5" />
      <RightSideVector />
      <BackgroundOverlay />
      <AnimatedFadeInAndOutOnScroll
        className={cn(
          "absolute flex w-full flex-col items-center justify-center gap-6 px-10 text-center font-sans text-white",
          isHome
            ? "bottom-10 lg:bottom-[8.375rem]"
            : "bottom-24 left-1/2 container mx-auto -translate-x-1/2 lg:bottom-[13.5rem]"
        )}
      >
        <h1 className={cn("text-white", titleClassName)}>{titleText}</h1>
        <p
          className={cn(
            isHome
              ? "text-[2rem] font-semibold text-wrap md:text-[2.75rem]"
              : "font-mono text-base/[1.625rem] text-wrap",
            descriptionClassName
          )}
        >
          {isHaveHighlight && highlightText
            ? descriptionText.split(highlightText).map((part, index, arr) => (
                <React.Fragment key={index}>
                  {part}
                  {index < arr.length - 1 && (
                    <span className="relative inline-block">
                      <HighlightCircleVector fill="#45A9E0" className="absolute top-0 left-0 h-auto w-36 md:w-50" />
                      <span className="relative">{highlightText}</span>
                    </span>
                  )}
                </React.Fragment>
              ))
            : descriptionText}
        </p>
        {isHaveButton && buttonLabel && buttonUrl && (
          <LinkButton
            buttonText={buttonLabel}
            href={buttonUrl}
            linkClassName="bg-white text-primary-400 hover:text-white min-w-[250px] h-12 py-0"
            iconClassName="text-red-500 border-primary group-hover/button:border-white group-hover/button:text-white"
          />
        )}
      </AnimatedFadeInAndOutOnScroll>
    </div>
  );
};

export default VideoHeroSection;
