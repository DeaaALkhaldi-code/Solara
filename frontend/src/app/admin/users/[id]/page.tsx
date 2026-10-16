import { UsersScaffold } from "@/features/users/components/users-scaffold";

export default function Page() {
  return <UsersScaffold
    title="Admin user details"
    purpose="Prepare administrative user detail operations."
    todos={["Require administrator authorization.","Implement validated management operations without exposing session or password hashes."]}
    access="admin"
  />;
}
