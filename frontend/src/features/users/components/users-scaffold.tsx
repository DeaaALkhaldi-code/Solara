"use client";

import { ScaffoldPage, type ScaffoldPageProps } from "@/components/ui/scaffold-page";
import { getUsersScaffoldStatus } from "../api";

export function UsersScaffold(props: ScaffoldPageProps) {
  return <ScaffoldPage {...props} loadStatus={getUsersScaffoldStatus} />;
}
