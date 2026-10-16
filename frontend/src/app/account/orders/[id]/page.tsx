import { OrdersScaffold } from "@/features/orders/components/orders-scaffold";

export default function Page() {
  return <OrdersScaffold
    title="Order details"
    purpose="Prepare a private customer order detail view."
    todos={["Verify the requested order belongs to the authenticated customer.","Render stored order-time price and name snapshots."]}
    access="account"
  />;
}
