import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { getCallPage } from "@/content/get-page";

const page = getCallPage("workshops");

export const metadata: Metadata = {
  title: page.title,
  description: page.intro,
};

export default function Page() {
  return <SimplePage page={page} />;
}
