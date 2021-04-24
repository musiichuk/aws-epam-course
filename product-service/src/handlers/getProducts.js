import { getAllProducts } from '../services/getAllProducts/getAllProducts';
import { buildHttpResponse } from '../utils/buildHttpResponse';

export const getProducts = async () => {
    try {
        const products = await getAllProducts();
        console.log(products);
        return buildHttpResponse(200, products);
    } catch (error) {
        console.log(error.message);
        return buildHttpResponse(500, { errorMessage: error.message });
    }

};