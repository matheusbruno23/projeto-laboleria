import { createOrderDB } from "../repositories/orders.repository.js";
import { getCakeById } from "../repositories/cakes.repository.js";
import { getClientById } from "../repositories/clients.repository.js";

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

export async function getOrders(req , res){
    try {
        
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

export async function getOrderById(req , res){
    try {
        
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}