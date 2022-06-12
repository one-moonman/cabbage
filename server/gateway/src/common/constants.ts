export const port = process.env.PORT || 5000
export const __prod__ = process.env.NODE_ENV === 'production'
export const secret = process.env.SECRET;
export const message = `[_GATEWAY_] 🕸 service listening at port:${port}`;

export const urls = {
    catalog: process.env.CATALOG_URL,
    cart: process.env.CART_URL,
    order: process.env.ORDER_URL
}