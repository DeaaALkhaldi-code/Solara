"use client";

import { ScaffoldPage, type ScaffoldPageProps } from "@/components/ui/scaffold-page";
import { getCalculatorScaffoldStatus } from "../api";

export function CalculatorScaffold(props: ScaffoldPageProps) {
  return <ScaffoldPage {...props} loadStatus={getCalculatorScaffoldStatus} />;
}
