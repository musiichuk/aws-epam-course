import { Client } from 'pg';
import format from 'pg-format';

import { dbOptions } from './src/utils/dbOptions';
import productList from './src/productList.json';

const invoke = async event => {
    const client = new Client(dbOptions);
    await client.connect();

    try {        
        const ddlResult = await client.query(`
            create table if not exists products (
                id uuid primary key,
                title text,
                description text,
                price integer,
                image text
            )`);

        const ddlResult2 = await client.query(`
            create table if not exists stocks (
                id serial primary key,
                product_id uuid,
                count integer,
                foreign key ("product_id") references "products" ("id")
            )`);

        const { rows: product } = await client.query(`select * from products where id = '7567ec4b-b10c-45c5-9345-fc73c48a80a1'`);
        if (!product.length) {
            const productValues = [];
            const stockValues = [];
            productList.forEach(product => {
                productValues.push([product.id, product.title, product.description, product.price, product.image]);
                stockValues.push([product.id, product.count]);
            });
    
            const dmlQueryFillProducts = format('insert into products(id, title, description, price, image) values %L', productValues);
            const productsDmlResult = await client.query(dmlQueryFillProducts);

            const dmlQueryFillStoks = format('insert into stocks(product_id, count) values %L', stockValues);
            const stockssDmlResult = await client.query(dmlQueryFillStoks);
        } else {
            const { rows: products } = await client.query(`select * from products`);
            console.log(products);
        }
    } catch (error) {
        console.log(error);
    } finally {
        client.end();
    }
}

export {invoke};