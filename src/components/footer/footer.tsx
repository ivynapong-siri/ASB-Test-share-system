"use client";

import { formatPhoneForTel } from "@/client/utils/helper";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ContactSettingJson } from "@/server/serializers/page-settings";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

interface FooterProps {
  menus: {
    id: string;
    title: string;
    sub: {
      label: string;
      href: string;
    }[];
  }[];
  socialLinks: {
    href: string;
    ariaLabel: string;
    icon: JSX.Element;
  }[];
  mainNavigationMenus: { label: string; href: string }[];
  contactSetting: ContactSettingJson;
}

export default function Footer({ menus, socialLinks, mainNavigationMenus, contactSetting }: FooterProps) {
  const contactTitle = contactSetting?.title ?? "";
  const address = contactSetting?.contact?.address ?? "";
  const schoolContactTitle = contactSetting?.schoolContactTitle ?? "";
  const schoolContactPhoneNumber = contactSetting?.schoolContactPhoneNumber ?? "";
  const admissionContactTitle = contactSetting?.admissionContactTitle ?? "";
  const admissionContactPhoneNumber = contactSetting?.admissionContactPhoneNumber ?? "";
  const googleMapUrl = contactSetting?.contact?.googleMapUrl;

  const isMobile = useIsMobile();

  const pathname = usePathname();
  const normalizedPathname = pathname.replace(/^\/(th|en|zh-hans|ja|ko)(\/|$)/, "/");

  function InformationGroup({
    header,
    description,
    googleMapUrl,
    isPhoneNumber = false,
  }: {
    header: string;
    description: string;
    googleMapUrl?: string;
    isPhoneNumber?: boolean;
  }) {
    const content = isPhoneNumber ? (
      isMobile ? (
        <Link
          href={`tel:${formatPhoneForTel(description)}`}
          className="flex flex-col font-mono text-sm text-white"
          aria-label="phone"
        >
          <span className="font-mono text-sm text-white">{description}</span>
        </Link>
      ) : (
        <span className="cursor-default font-mono text-sm text-white">{description}</span>
      )
    ) : googleMapUrl ? (
      <Link
        href={googleMapUrl}
        className="flex flex-col font-mono text-sm text-white"
        aria-label="google"
        target="_blank"
      >
        <span className="font-mono text-sm text-white">{description}</span>
        (Google Maps)
      </Link>
    ) : (
      <span className="font-mono text-sm text-white">{description}</span>
    );

    return (
      <div className="flex flex-col gap-2">
        <span className="font-medium text-white">{header}</span>
        {content}
      </div>
    );
  }

  return (
    <footer
      className="bg-primary-300 border-b py-10"
      style={{
        minHeight: "300px",
        height: "auto",
        contain: "layout",
        contentVisibility: "auto",
      }}
    >
      <div className="px-10 xl:container xl:mx-auto">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex flex-col gap-6">
              <Link href="/home" aria-label="go home" className="block size-fit">
                <div className="relative h-20 min-h-[80px] w-34 min-w-[136px]">
                  <Image
                    alt="main-logo"
                    src="https://dcb9450325.nxcli.io/wp-content/uploads/2025/08/Primary-Logo-SVG.svg"
                    fill
                    className="object-contain transition duration-300"
                    priority={false}
                    sizes="(max-width: 768px) 136px, (max-width: 1024px) 150px, 136px"
                    quality={90}
                  />
                </div>
              </Link>
              {InformationGroup({
                header: contactTitle,
                description: address,
                googleMapUrl: googleMapUrl,
              })}
              {InformationGroup({
                header: schoolContactTitle,
                description: schoolContactPhoneNumber,
                isPhoneNumber: true,
              })}
              {InformationGroup({
                header: admissionContactTitle,
                description: admissionContactPhoneNumber,
                isPhoneNumber: true,
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-3 md:grid-cols-3">
            {menus?.map((menu, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium text-white">{menu.title} </span>
                <div className="space-y-2 font-mono">
                  {menu.sub.map((item, index) => {
                    const isActive = normalizedPathname === item.href;

                    return (
                      <Link
                        key={index}
                        href={item.href}
                        target={item.href.startsWith("https") ? "_blank" : undefined}
                        rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                        className={cn(
                          "block text-gray-400 duration-150 hover:text-white",
                          isActive && "text-bold text-white"
                        )}
                      >
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="space-y-3 text-sm">
              {mainNavigationMenus.map((menu, index) => (
                <Link key={index} href={menu.href} className="block text-white duration-150 hover:text-gray-400">
                  <span>{menu.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 justify-between gap-10 py-6 text-white md:grid-cols-5 md:gap-6">
          <div className="col-span-1 flex flex-wrap justify-start gap-3 text-sm md:col-span-4 lg:gap-6">
            {socialLinks.map((social, index) => {
              const { icon } = social;
              return (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="text-muted-foreground hover:text-primary block"
                >
                  {icon}
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col gap-2 text-start font-mono lg:text-start">
            {/* temp hide */}
            {/* <Link href="" className="block text-sm text-white duration-150 hover:text-gray-400">
              Support Us
            </Link> */}
            <Link href="/privacy-policy" className="block text-sm text-white duration-150 hover:text-gray-400">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
