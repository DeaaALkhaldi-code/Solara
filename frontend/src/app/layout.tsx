import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ScaffoldNavigation } from "@/components/layout/scaffold-navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Solara", template: "%s | Solara" },
  description: "Solar energy platform",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body><ScaffoldNavigation />{children}</body>
    </html>
  );
}
