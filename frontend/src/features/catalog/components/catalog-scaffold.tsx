"use client";

import { ScaffoldPage, type ScaffoldPageProps } from "@/components/ui/scaffold-page";
import { getCatalogScaffoldStatus } from "../api";

export function CatalogScaffold(props: ScaffoldPageProps) {
  return <ScaffoldPage {...props} loadStatus={getCatalogScaffoldStatus} />;
}
