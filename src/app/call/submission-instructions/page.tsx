import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { Button } from "@/components/ui";
import { getPage } from "@/content/get-page";
import { links } from "@/content/site";

const page = getPage("submission-instructions");

/**
 * Microsoft's condition for providing CMT free of charge, sent by Florent
 * Berthaut (CMT chair). Their rules: the exact wording, as plain text in a
 * paragraph, with no bold or italics, in the HTML source rather than added by
 * script, and never removed. It lives here rather than in the studio-editable
 * markdown so nobody can delete or reword it without knowing why it is there.
 * Keep it a single string so React adds nothing inside the paragraph.
 */
const CMT_ACKNOWLEDGMENT =
  "The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.";

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
      <p className="mt-16 max-w-2xl border-t border-white/10 pt-8 text-[13px] leading-relaxed text-brume">
        {CMT_ACKNOWLEDGMENT}
      </p>
    </SimplePage>
  );
}
