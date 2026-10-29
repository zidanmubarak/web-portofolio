import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SignatureDev } from "./dev-client";

export const metadata: Metadata = {
  title: "RUBRIC — signature and loader",
  robots: { index: false, follow: false },
};

export default function SignatureDevPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }
  return <SignatureDev />;
}
