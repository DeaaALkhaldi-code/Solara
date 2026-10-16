import { OrdersScaffold } from "@/features/orders/components/orders-scaffold";

export default function Page() {
  return <OrdersScaffold
    title="Manage orders"
    purpose="Prepare administrative order review."
    todos={["Require administrator authorization.","Build order queues and permitted status updates."]}
    access="admin"
  />;
}
