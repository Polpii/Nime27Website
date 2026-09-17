import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { pages } from "@/content/pages";

const page = pages["committee"];

export const metadata: Metadata = {
  title: page.title,
  description: page.intro,
};

export default function Page() {
  return <SimplePage page={page} />;
}
