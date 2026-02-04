import LinkButton from "@/components/custom/buttons/link-button";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations();
  return (
    <div className="relative">
      {/* <Navbar /> */}
      <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="flex w-full flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-secondary animate-bounce text-5xl font-bold sm:text-6xl">404</h1>
            <p className="text-primary font-mono text-2xl sm:text-3xl">{t("404.title")}</p>
          </div>
          <LinkButton buttonText={t("404.action")} href="/home" />
        </div>
      </div>
      {/* <Footer {...MockDataFooter} /> */}
    </div>
  );
}
