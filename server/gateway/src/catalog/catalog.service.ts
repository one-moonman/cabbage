import axios from "axios";
import { createFieldError } from "../common/utils";

export default abstract class CatalogBaseService {

    constructor(protected readonly URL: string) { this.URL = URL }

    public async findAll() {
        const { data } = await axios.get(this.URL)
            .catch(err => { throw new Error(err.message) })
        return data;
    }

    public async findBySlug(slug: string) {
        try {
            const { data } = await axios.get(this.URL + '/' + slug)
            return { data };
        } catch (error) {
            return createFieldError('slug', error.message)
        }
    }
}