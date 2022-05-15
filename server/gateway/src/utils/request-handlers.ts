import axios from "axios";

export async function get(url: string, body?: object) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}