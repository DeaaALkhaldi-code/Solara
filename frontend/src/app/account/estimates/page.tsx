import { CalculatorScaffold } from "@/features/calculator/components/calculator-scaffold";

export default function Page() {
  return <CalculatorScaffold
    title="Saved estimates"
    purpose="Prepare the customer’s saved estimate list."
    todos={["Require authentication and filter by owner.","Build saved-estimate history and result views."]}
    access="account"
  />;
}
