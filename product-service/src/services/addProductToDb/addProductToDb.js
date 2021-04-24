import { Pool } from 'pg';
import { v4 as uuidv4 } from 'uuid';
import { dbOptions } from '../../utils/dbOptions';
const pool = new Pool(dbOptions);

export const addProductToDb = async (product) => {
    const { title, description, price, image } = product;
    const client = await pool.connect();
    try {
        const uuid = uuidv4();
        await client.query('BEGIN');
        await client.query('insert into products(id, title, description, price, image) values ($1, $2, $3, $4, $5)', [ uuid, title, description, price, image ]);
        await client.query('insert into stocks(product_id, count) values ($1, $2)', [uuid, 10]);
        await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(error);
    } finally {
      client.release();
    }
};