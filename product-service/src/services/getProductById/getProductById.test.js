import { getProductById } from './getProductById';

const productMock = { 
    count: 7,
    description: 'Short Product Description2',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a8333',
    price: 180,
    title: 'Iphone 7',
    image:'https://ipeople.in.ua/files/products/2828.500x500.jpg.pagespeed.ce.15axGm8KNc.jpg' 
};

describe('getProductById', () => {
    test('should return searched product', async () => {
        const productId = '7567ec4b-b10c-48c5-9345-fc73c48a8333';
        const product = await getProductById(productId);
        expect(product).toEqual(productMock);
    });

    test('should return null if there is no id at param', async () => {
        const product = await getProductById();
        expect(product).toEqual(null);
    });

    test('should return null if there is no product with this id', async () => {
        const product = await getProductById('adasdsd-fdsfdf-id');
        console.log('product: ', product);
        expect(product).toEqual(null);
    });
});