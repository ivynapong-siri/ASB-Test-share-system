import PrivacyPolicyDetail from "@/components/pages/privacy-policy/PrivacyPolicyDetail";
import { generateSEOMetadata } from "@/lib/seo";
import { Metadata } from "next";

export const revalidate = 3600; // 1 hour
export const dynamic = "force-static";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await props.params;
  return await generateSEOMetadata({
    locale,
    path: "privacy-policy",
    title: "Privacy Policy - American School Bangkok",
    description: "Privacy Policy - XCL Education",
    useWordPressSEO: false,
  });
}

export default function page() {
  return <PrivacyPolicyDetail />;
}
