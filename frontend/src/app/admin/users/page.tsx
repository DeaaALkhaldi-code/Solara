import { UsersScaffold } from "@/features/users/components/users-scaffold";

export default function Page() {
  return <UsersScaffold
    title="Manage users"
    purpose="Prepare administrative user management."
    todos={["Require administrator authorization.","Map explicit public user fields; never return authentication secrets."]}
    access="admin"
  />;
}
