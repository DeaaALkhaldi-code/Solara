"use client";

import { ScaffoldPage, type ScaffoldPageProps } from "@/components/ui/scaffold-page";
import { getHomeScaffoldStatus } from "../api";

export function HomeScaffold(props: ScaffoldPageProps) {
  return <ScaffoldPage {...props} loadStatus={getHomeScaffoldStatus} />;
}
