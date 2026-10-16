"use client";

import { ScaffoldPage, type ScaffoldPageProps } from "@/components/ui/scaffold-page";
import { getOrdersScaffoldStatus } from "../api";

export function OrdersScaffold(props: ScaffoldPageProps) {
  return <ScaffoldPage {...props} loadStatus={getOrdersScaffoldStatus} />;
}
