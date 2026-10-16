import { CatalogScaffold } from "@/features/catalog/components/catalog-scaffold";

export default function Page() {
  return <CatalogScaffold
    title="Product catalog"
    purpose="Browse products and categories."
    todos={["Build catalog filters and product cards.","Implement public product/category queries."]}
  />;
}
