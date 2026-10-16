import { SupportScaffold } from "@/features/support/components/support-scaffold";

export default function Page() {
  return <SupportScaffold
    title="Support ticket details"
    purpose="Prepare a private customer support conversation."
    todos={["Verify ticket ownership before loading replies.","Implement customer-visible replies without exposing staff notes."]}
    access="account"
  />;
}
