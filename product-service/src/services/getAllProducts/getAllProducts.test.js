import productsMock from '../../productList.json';
import { getAllProducts } from './getAllProducts';

describe('getAllProducts', () => {
    test('should return all hardcoded products', async () => {
        const products = await getAllProducts();
        expect(products).toEqual(productsMock);
    })
})
