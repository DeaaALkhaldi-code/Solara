"use client";

import { ScaffoldPage, type ScaffoldPageProps } from "@/components/ui/scaffold-page";
import { getAuthScaffoldStatus } from "../api";

export function AuthScaffold(props: ScaffoldPageProps) {
  return <ScaffoldPage {...props} loadStatus={getAuthScaffoldStatus} />;
}
