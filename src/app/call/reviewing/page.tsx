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
    <SimplePage page={page}>
      {/* The sign-up form does not exist yet. Setting links.reviewerSignUp
          turns this into a real call to action, and the page's callout can
          come out at the same time. */}
      {links.reviewerSignUp && (
        <div className="mt-14 border-t border-white/10 pt-10">
          <Button href={links.reviewerSignUp} external>
            Sign up to review
          </Button>
        </div>
      )}
    </SimplePage>
  );
}
