import { UsersScaffold } from "@/features/users/components/users-scaffold";

export default function Page() {
  return <UsersScaffold
    title="Account"
    purpose="Prepare a customer account overview."
    todos={["Require a verified session before loading private data.","Compose owner-scoped account summaries."]}
    access="account"
  />;
}
