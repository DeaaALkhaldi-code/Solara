import { SupportScaffold } from "@/features/support/components/support-scaffold";

export default function Page() {
  return <SupportScaffold
    title="My support tickets"
    purpose="Prepare the customer’s support history."
    todos={["Require authentication and owner-scoped queries.","Build ticket history and conversation links."]}
    access="account"
  />;
}
