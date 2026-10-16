import { OrdersScaffold } from "@/features/orders/components/orders-scaffold";

export default function Page() {
  return <OrdersScaffold
    title="Checkout"
    purpose="Submit a real order once ordering is implemented."
    todos={["Build the checkout form.","Implement authenticated transactional order creation and server-calculated totals."]}
  />;
}
