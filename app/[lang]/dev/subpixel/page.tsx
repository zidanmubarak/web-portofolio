import { notFound } from "next/navigation";

import { SubpixelLab } from "./subpixel-lab";

export const metadata = {
  title: "dev / subpixel - T3",
  robots: { index: false, follow: false },
};

export default function SubpixelDevPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <SubpixelLab />;
}
