import { AuthScaffold } from "@/features/auth/components/auth-scaffold";

export default function Page() {
  return <AuthScaffold
    title="Login"
    purpose="Prepare the sign-in interface without issuing sessions."
    todos={["Build the login form.","Implement verified credentials and secure session cookies; never simulate login."]}
  />;
}
