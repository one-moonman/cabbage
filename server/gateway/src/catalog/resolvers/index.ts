import CatalogQueryResolver from "./catalog-query.resolver";
import CategoryResolver from "./category.resolver";
import ProductResolver from "./product.resolver";
import VariantResolver from "./variant.resolver";
import CartItemResolver from "./cart-item.resolver";

const resolvers = [CatalogQueryResolver, CategoryResolver, ProductResolver, VariantResolver, CartItemResolver];

export default {
    CatalogQueryResolver, CategoryResolver, ProductResolver, VariantResolver, CartItemResolver,
    resolvers
}