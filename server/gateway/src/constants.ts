export default {
    port: process.env.PORT || 5000,
    catalog: process.env.CATALOG_URL,
    cart: process.env.CART_URL,
    order: ''
} as const;