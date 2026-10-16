"use client";

import { ScaffoldPage, type ScaffoldPageProps } from "@/components/ui/scaffold-page";
import { getSupportScaffoldStatus } from "../api";

export function SupportScaffold(props: ScaffoldPageProps) {
  return <ScaffoldPage {...props} loadStatus={getSupportScaffoldStatus} />;
}
