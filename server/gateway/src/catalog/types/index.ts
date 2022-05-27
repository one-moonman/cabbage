import CatalogQueryUnionType from "./catalog-query.type";
import Category from "./category.type";
import Product from "./product.type";
import Variant from "./variant.type";
import CartItem from "./cart-item.type";
const typeDefs = [CatalogQueryUnionType, Category, Product, Variant, CartItem];

export default {
    CatalogQueryUnionType, Category, Product, Variant, CartItem,
    typeDefs
}