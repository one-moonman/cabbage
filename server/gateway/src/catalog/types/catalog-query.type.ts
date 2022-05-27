import { createUnionType } from "type-graphql";
import Category from "./category.type";
import Product from "./product.type";
import Variant from "./variant.type";

const CatalogQueryUnionType = createUnionType({
    name: "SearchResult",
    types: () => [Category, Product, Variant] as const,
    resolveType: value => {
        if ("stock" in value) {
            return 'Variant';
        }
        if ("variants" in value) {
            return 'Product';
        }
        return 'Category';
    },
});

export default CatalogQueryUnionType;