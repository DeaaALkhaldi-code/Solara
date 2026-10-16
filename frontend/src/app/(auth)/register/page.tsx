import { AuthScaffold } from "@/features/auth/components/auth-scaffold";

export default function Page() {
  return <AuthScaffold
    title="Register"
    purpose="Prepare account registration without creating accounts."
    todos={["Build registration input validation.","Implement password hashing and server-controlled customer roles."]}
  />;
}
