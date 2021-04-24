import { getProductById } from '../services/getProductById/getProductById';
import { buildHttpResponse } from '../utils/buildHttpResponse';

export const getProduct = async (event, context) => {
    const { id: productId = '' } = event.pathParameters;
    console.log(event.pathParameters);
    try {
      const product = await getProductById(productId);
      if (!product) throw new Error('Product not found');
      
      return buildHttpResponse(200, product);
    } catch (error) {
      console.log(error.message);
      return buildHttpResponse(500, { errorMessage: error.message });
    }
};