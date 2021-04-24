import { getProduct } from './getProduct';

const productMock = { 
    count: 7,
    description: 'Short Product Description2',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a8333',
    price: 180,
    title: 'Iphone 7',
    image:'https://ipeople.in.ua/files/products/2828.500x500.jpg.pagespeed.ce.15axGm8KNc.jpg' 
};

const event = {
    pathParameters: {
        id: '7567ec4b-b10c-48c5-9345-fc73c48a8333',
    }
}

describe('getProduct', () => {
    test('should return statusCode 200', async () => {
        const response = await getProduct(event);
        expect(response.statusCode).toEqual(200);
    });

    test('should return statusCode 404 if there is wrong id', async () => {
        event.pathParameters.id = '324324324234234';
        const response = await getProduct(event);
        expect(response.statusCode).toEqual(404);
    });
});