import { Variant } from "../catalog/variant/variant.type";
import axios from "axios";
import { urls } from "./constants";

export const createFieldError = (field: string, message: string) => ({ error: { field, message } })

export const roundPrice = (x: number) => Math.round(x * 100) / 100;

export const getCommittedAvailability = async (variant: Variant) => {
    const committed: number = await (await axios.get(urls.cart + 'stock/committed/' + variant._id)).data;

    let response = await axios.get(urls.cart + 'stock/availability/' + variant._id)
    const availability: number = variant.stock - committed - response.data;

    return { committed, availability }
}