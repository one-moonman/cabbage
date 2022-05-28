export const port = process.env.PORT || 5000
export const catalog = process.env.CATALOG_URL
export const cart = process.env.CART_URL
export const order = ''
export const __prod__ = process.env.NODE_ENV === 'production'
export const secret = process.env.SECRET;