import axios from "axios";

export async function get(url: string) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export async function put(url: string, body?: object) {
    try {
        const response = await axios.put(url, body);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}