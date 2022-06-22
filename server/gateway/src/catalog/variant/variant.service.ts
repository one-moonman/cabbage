import { Variant } from "./variant.type";
import { createFieldError, getCommittedAvailability } from "../../common/utils";
import axios from "axios";
import CatalogBaseService from "../catalog.service";

export default class VariantService extends CatalogBaseService {
    constructor(URL: string) { super(URL) }

    public async findAll() {
        try {
            const { data }: { data: any[] } = await axios.get(this.URL)
            const variants = new Array(data.length)
            for await (const v of data) {
                variants.push({
                    ...v,
                    ...await getCommittedAvailability(v)
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
            const v: Variant = data;
            const variant = {
                ...v,
                ...await getCommittedAvailability(v)
            }
            return { data: variant };
        } catch (error) {
            return createFieldError('slug', error.message)
        }
    }
}

