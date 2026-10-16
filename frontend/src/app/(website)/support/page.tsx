import { SupportScaffold } from "@/features/support/components/support-scaffold";

export default function Page() {
  return <SupportScaffold
    title="Technical support"
    purpose="Prepare the customer support entry point."
    todos={["Build the support request form.","Implement authenticated ticket creation and ownership checks."]}
  />;
}
