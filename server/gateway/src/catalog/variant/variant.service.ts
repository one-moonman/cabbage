import { Variant } from "./variant.type";
import { urls } from "../../common/constants";
import { createFieldError } from "../../common/utils";
import axios from "axios";
import CatalogBaseService from "../catalog.service";

export default class VariantService extends CatalogBaseService {
    constructor(URL: string) { super(URL) }

    // public async resolveCommitted(variant: Variant) {
    //     try {
    //         const { data } = await axios.get(urls.cart + 'stock/committed/' + variant._id)
    //         variant.committed = data;
    //         return data;
    //     } catch (error) {
    //         return createFieldError('slug', error.message);
    //     }
    // }

    // public async resolveAvailability(variant: Variant) {
    //     try {
    //         let { data } = await axios.get(urls.cart + 'stock/availability/' + variant._id)
    //         const availability = variant.availability - data;
    //         return availability;
    //     } catch (error) {
    //         return createFieldError('slug', error.message);
    //     }
    // }


    public async findAll() {
        try {
            const { data }: { data: any[] } = await axios.get(this.URL)
            const variants = new Array(data.length)
            for await (const v of data) {
                let response = await axios.get(urls.cart + 'stock/committed/' + v._id)
                const committed: number = response.data;
                response = await axios.get(urls.cart + 'stock/availability/' + v._id)
                const availability: number = v.stock - committed - response.data;
                variants.push({
                    ...v,
                    committed,
                    availability
                })
            }
            return variants;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async findBySlug(slug: string) {
        try {
            let { data } = await axios.get(this.URL + '/' + slug)
            const v = data;
            let response = await axios.get(urls.cart + 'stock/committed/' + v._id)
            const committed: number = response.data;
            response = await axios.get(urls.cart + 'stock/availability/' + v._id)
            const availability: number = v.stock - committed - response.data;
            const variant = { ...v, committed, availability }
            return { data: variant };
        } catch (error) {
            return createFieldError('slug', error.message)
        }
    }
}

export class VariantService2 {
    private URL: string;

    public async findAll() {
        try {
            const { data }: { data: any[] } = await axios.get(this.URL)
            const variants = new Array(data.length)
            for await (const v of data) {
                let response = await axios.get(urls.cart + 'stock/committed/' + v._id)
                const committed: number = response.data;
                response = await axios.get(urls.cart + 'stock/availability/' + v._id)
                const availability: number = v.stock - committed - response.data;
                variants.push({
                    ...v,
                    committed,
                    availability
                })
            }
            return variants;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public async findBySlug(slug: string) {
        try {
            let { data } = await axios.get(this.URL + '/' + slug)
            const v = data;
            let response = await axios.get(urls.cart + 'stock/committed/' + v._id)
            const committed: number = response.data;
            response = await axios.get(urls.cart + 'stock/availability/' + v._id)
            const availability: number = v.stock - committed - response.data;
            const variant = { ...v, committed, availability }
            return { data: variant };
        } catch (error) {
            return createFieldError('slug', error.message)
        }
    }
}