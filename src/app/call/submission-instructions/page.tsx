import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { Button } from "@/components/ui";
import { getPage } from "@/content/get-page";
import { links } from "@/content/site";

const page = getPage("submission-instructions");

export const metadata: Metadata = {
  title: page.title,
  description: page.intro,
};

export default function Page() {
  return (
    <SimplePage page={page}>
      {links.submissions && (
        <div className="mt-14 border-t border-white/10 pt-10">
          <Button href={links.submissions} external>
            Go to the submission system
          </Button>
        </div>
      )}
    </SimplePage>
  );
}
