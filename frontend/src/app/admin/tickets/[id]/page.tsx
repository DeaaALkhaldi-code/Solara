import { SupportScaffold } from "@/features/support/components/support-scaffold";

export default function Page() {
  return <SupportScaffold
    title="Admin support details"
    purpose="Prepare support replies and internal staff notes."
    todos={["Require administrator authorization.","Keep internal notes separate from customer-visible replies."]}
    access="admin"
  />;
}
