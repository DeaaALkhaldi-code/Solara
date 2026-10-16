import { OrdersScaffold } from "@/features/orders/components/orders-scaffold";

export default function Page() {
  return <OrdersScaffold
    title="My orders"
    purpose="Prepare customer order history."
    todos={["Require authentication and owner-scoped queries.","Build order history and detail links."]}
    access="account"
  />;
}
