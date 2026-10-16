import { CartScaffold } from "@/features/cart/components/cart-scaffold";

export default function Page() {
  return <CartScaffold
    title="Cart"
    purpose="Prepare client-side selections for checkout."
    todos={["Implement cart state and quantity controls.","Validate selections before checkout; do not trust client prices."]}
  />;
}
