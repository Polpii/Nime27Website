import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { Button } from "@/components/ui";
import { getPage } from "@/content/get-page";
import { links } from "@/content/site";

const page = getPage("reviewing");

export const metadata: Metadata = {
  title: page.title,
  description: page.intro,
};

export default function Page() {
  return (
    <SimplePage
      page={page}
      cta={
        links.reviewerSignUp && (
          <Button href={links.reviewerSignUp} external>
            Sign up to review
          </Button>
        )
      }
    />
  );
}
