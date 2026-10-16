import { CatalogScaffold } from "@/features/catalog/components/catalog-scaffold";

export default function Page() {
  return <CatalogScaffold
    title="Product details"
    purpose="Show a selected product when catalog queries are implemented."
    todos={["Resolve the route slug through the catalog API.","Build product details and cart handoff."]}
  />;
}
