import axios from "axios";
import { createFieldError } from "./utils";

export default abstract class CatalogService {
    protected static readonly URL: string;

    public static async findAll() {
        try {
            const { data } = await axios.get(this.URL);
            return { data };
        } catch (error) {
            throw new Error(error.message)
        }
    }

    public static async findBySlug(slug: string) {
        try {
            const { data } = await axios.get(URL + '/' + slug)
            return { data };
        } catch (error) {
            return createFieldError('slug', error.message)
        }
    }
}