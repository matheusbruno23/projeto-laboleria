import { createOrderDB } from "../repositories/orders.repository.js";
import { getCakeById } from "../repositories/cakes.repository.js";
import { getClientById } from "../repositories/clients.repository.js";
import { db } from "../database/db.connection.js";

export async function createOrderHandler(req , res){
    const { clientId, cakeId, quantity, totalPrice } = req.body;

    try {
        const clientExist = await getClientById(clientId);
        if (clientExist.rowCount === 0) return res.sendStatus(404);
          
        const cakeExist = await getCakeById(cakeId);
        if (cakeExist.rowCount === 0) return res.sendStatus(404);

        createOrderDB(clientId , cakeId , quantity , totalPrice);
        return res.sendStatus(201);

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export async function getOrdersHandler(req , res){


    try {

        const orders = await db.query(
            `SELECT 
            orders.id AS "orderId",
            orders."created_at",
            orders.quantity,
            orders."total_price",
            cakes.id AS "cakeId",
            cakes.name AS "cakeName",
            cakes.price,
            cakes.description,
            cakes.image,
            clients.id AS "clientId",
            clients.name AS "clientName",
            clients.address,
            clients.phone 
            FROM orders
            JOIN clients ON orders."client_id" = clients.id
            JOIN cakes ON orders."cake_id" = cakes.id`);
    
            const allOrders = orders.rows.map((e) => {
    
                const ordersData = {
                    client: {
                        id: e.clientId,
                        name: e.clientName,
                        address: e.address,
                        phone: e.phone,
                      },
                      cake: {
                        id: e.cakeId,
                        name: e.cakeName,
                        price: e.price,
                        description: e.description,
                        image: e.image,
                      },
                      orderId: e.ordersId,
                      createdAt: e.createdAt,
                      quantity: e.quantity,
                      totalPrice: e.totalPrice,
                }
    
                return ordersData;
            });
    
            if(allOrders.length === 0){
                return res.status(404).send([])
            }
    
            res.status(200).send(allOrders);
        
        
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export async function getOrderByIdHandler(req , res){

    const orderId = req.params.id;

    try {

        const order = await db.query(
            `
            SELECT 
              orders.id AS "orderId",
              orders."created_at",
              orders.quantity,
              orders."total_price",
              cakes.id AS "cakeId",
              cakes.name AS "cakeName",
              cakes.price,
              cakes.description,
              cakes.image,
              clients.id AS "clientId",
              clients.name AS "clientName",
              clients.address,
              clients.phone 
            FROM orders
            JOIN clients ON orders.client_id = clients.id
            JOIN cakes ON orders.cake_id = cakes.id
            WHERE orders.id = $1
            `,
            [orderId]
          );
    
          if (order.rowCount === 0) return res.status(404).send({ message: "Pedido não encontrado" });


    const orderData = {
        client: {
          id: order.rows[0].clientId,
          name: order.rows[0].clientName,
          address: order.rows[0].address,
          phone: order.rows[0].phone,
        },
        cake: {
          id: order.rows[0].cakeId,
          name: order.rows[0].cakeName,
          price: order.rows[0].price,
          description: order.rows[0].description,
          image: order.rows[0].image,
        },
        orderId: order.rows[0].orderId,
        createdAt: order.rows[0].createdAt,
        quantity: order.rows[0].quantity,
        totalPrice: order.rows[0].totalPrice,
      };
  
      res.status(200).send(orderData);
          

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}