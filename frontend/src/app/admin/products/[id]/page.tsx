import { CatalogScaffold } from "@/features/catalog/components/catalog-scaffold";

export default function Page() {
  return <CatalogScaffold
    title="Edit product"
    purpose="Prepare editing of a selected product."
    todos={["Require administrator authorization.","Load and update a real product with validated input."]}
    access="admin"
  />;
}
