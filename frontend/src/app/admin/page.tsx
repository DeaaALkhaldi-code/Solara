import { UsersScaffold } from "@/features/users/components/users-scaffold";

export default function Page() {
  return <UsersScaffold
    title="Admin dashboard"
    purpose="Prepare an administrative overview."
    todos={["Require a verified administrator on every private backend operation.","Compose real summaries after feature APIs exist."]}
    access="admin"
  />;
}
