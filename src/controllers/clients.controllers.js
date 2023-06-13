import { createClientDB, getClientById} from '../repositories/clients.repository.js';
import { db } from '../database/db.connection.js';

export async function createClientHandler(req , res) {
    const { name, address, phone } = req.body;

    try {
        await createClientDB(name, address, phone);

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}

export async function getClientOrdersHandler (req, res){
    const clientId = req.params.id;
try {
    const client = await getClientById(clientId)

    if (client.rowCount === 0) return res.sendStatus(404)

    const orders = await db.query(
        `
        SELECT 
          orders.id AS "order_id",
          orders.quantity,
          orders."created_at",
          orders."total_price",
          cakes.name AS "cakeName"
        FROM orders
        JOIN cakes ON orders.cake_id = cakes.id
        WHERE orders.client_id = $1
        `,
        [clientId]
      );
  
      const clientOrders = orders.rows.map((order) => {
        return {
          orderId: order.order_id,
          quantity: order.quantity,
          createdAt: order.created_at,
          totalPrice: order.total_price,
          cakeName: order.cakeName,
        };
      });
  
      res.status(200).send(clientOrders);
      
} catch (error) {
    
}
}