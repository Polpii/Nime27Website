import type { Metadata } from "next";
import Image from "next/image";
import { SimplePage } from "@/components/simple-page";
import { getCallPage } from "@/content/get-page";

const page = getCallPage("artifacts");

export const metadata: Metadata = {
  title: page.title,
  description: page.intro,
};

export default function Page() {
  return (
    <SimplePage
      page={page}
      banner={
        // Nicolò's drawing for the track. The file he sent is a transparent
        // PNG on an A3 canvas with the track name set under it; the title is
        // cropped off here because the page already carries it as the heading
        // directly above, and the margins are cropped to the artwork.
        <Image
          src="/artifacts-ideas.png"
          alt="Line drawing in two halves. On the left, a triangular instrument shown exploded: its folded card shell, circuit board, perforated panel and printed base float apart from a wireframe tetrahedron, with a potentiometer, a push button and a microcontroller linked in by dashed assembly lines. On the right, four starburst outlines each holding an icon: two magnets, an apple, and a timing diagram labelled with a duration and a delay."
          width={2048}
          height={950}
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="h-auto w-full"
          priority
        />
      }
    />
  );
}
