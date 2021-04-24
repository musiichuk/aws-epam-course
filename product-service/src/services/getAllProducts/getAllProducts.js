import { Client } from 'pg';
import { dbOptions } from '../../utils/dbOptions';

export const getAllProducts = async () => {
    const client = new Client(dbOptions);
    await client.connect();
    try {
      const { rows: products } = await client.query(`
        select p.id, p.title, p.description, p.price, p.image, s.count
        from products p left join stocks s on (p.id = s.product_id)`);
      return products
    } catch (error) {
      throw new Error(error);
    } finally {
      client.end();
  }
};