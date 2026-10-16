import { CalculatorScaffold } from "@/features/calculator/components/calculator-scaffold";

export default function Page() {
  return <CalculatorScaffold
    title="Solar calculator"
    purpose="Plan household solar sizing and estimate results."
    todos={["Build appliance and assumption inputs.","Implement and validate the versioned backend calculation."]}
  />;
}
