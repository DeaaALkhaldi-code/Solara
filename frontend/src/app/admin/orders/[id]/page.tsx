import { OrdersScaffold } from "@/features/orders/components/orders-scaffold";

export default function Page() {
  return <OrdersScaffold
    title="Admin order details"
    purpose="Prepare administrative order detail and status controls."
    todos={["Require administrator authorization.","Implement allowed status transitions without altering historical snapshots."]}
    access="admin"
  />;
}
