import { addProductToDb } from '../services/addProductToDb/addProductToDb';
import { buildHttpResponse } from '../utils/buildHttpResponse';

export const addProduct = async (event, context) => {
    const { title = '', description = '', price = 0, image = '' } = JSON.parse(event.body);
    console.log(JSON.parse(event.body))
    if (!title || !description || !price || !image) return buildHttpResponse(400, { errorMessage: 'Product data is invalid' });
    try {
        await addProductToDb({title, description, price, image})
        return buildHttpResponse(200, { message: 'Product was added successfully'});
    } catch (error) {
        return buildHttpResponse(500, { errorMessage: error.message });
    }
};