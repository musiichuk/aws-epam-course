import { getProducts } from './getProducts';

describe('getProduct', () => {
    test('should return statusCode 200', async () => {
        const response = await getProducts();
        expect(response.statusCode).toEqual(200);
    });
});