import { UsersScaffold } from "@/features/users/components/users-scaffold";

export default function Page() {
  return <UsersScaffold
    title="Account profile"
    purpose="Prepare customer profile editing."
    todos={["Implement session verification and owner-scoped reads.","Build validated profile updates."]}
    access="account"
  />;
}
