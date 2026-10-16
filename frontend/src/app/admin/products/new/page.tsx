import { CatalogScaffold } from "@/features/catalog/components/catalog-scaffold";

export default function Page() {
  return <CatalogScaffold
    title="New product"
    purpose="Prepare product creation."
    todos={["Require administrator authorization.","Build validated product creation backed by the catalog service."]}
    access="admin"
  />;
}
