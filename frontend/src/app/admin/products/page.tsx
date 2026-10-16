import { CatalogScaffold } from "@/features/catalog/components/catalog-scaffold";

export default function Page() {
  return <CatalogScaffold
    title="Manage products"
    purpose="Prepare product management."
    todos={["Require administrator authorization.","Build catalog management and real product operations."]}
    access="admin"
  />;
}
