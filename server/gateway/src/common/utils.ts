export const createFieldError = (field: string, message: string) => ({ error: { field, message } })

export const roundPrice = (x: number) => Math.round(x * 100) / 100;