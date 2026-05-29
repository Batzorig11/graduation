import "../src/styles.css";
import { presentationContent } from "../src/presentationData";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "Kami Codebook Python Graduation",
  description: presentationContent.meta.kicker,
};

export default function RootLayout({ children }) {
  return (
    <html lang="mn" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
