"use client";

import { ScaffoldPage, type ScaffoldPageProps } from "@/components/ui/scaffold-page";
import { getCartScaffoldStatus } from "../api";

export function CartScaffold(props: ScaffoldPageProps) {
  return <ScaffoldPage {...props} loadStatus={getCartScaffoldStatus} />;
}
