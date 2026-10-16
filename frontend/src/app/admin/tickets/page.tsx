import { SupportScaffold } from "@/features/support/components/support-scaffold";

export default function Page() {
  return <SupportScaffold
    title="Manage support tickets"
    purpose="Prepare administrative support queues."
    todos={["Require administrator authorization.","Build queues and status filters."]}
    access="admin"
  />;
}
