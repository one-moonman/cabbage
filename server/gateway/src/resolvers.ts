import axios from "axios";

export default {
    Query: {
        hello: () => 'Hello World',
        categories: async () => {
            const response = await axios.get('http://localhost:3000/api/v1/catalog/categories');
            return response.data;
        },
        products: async () => {
            const response = await axios.get('http://localhost:3000/api/v1/catalog/products');
            return response.data;
        },
        variants: async () => {
            const response = await axios.get('http://localhost:3000/api/v1/catalog/variants');
            return response.data;
        }
    },
};
