import { CatalogScaffold } from "@/features/catalog/components/catalog-scaffold";

export default function Page() {
  return <CatalogScaffold
    title="Manage categories"
    purpose="Prepare category management."
    todos={["Require administrator authorization.","Build validated category management and backend operations."]}
    access="admin"
  />;
}
