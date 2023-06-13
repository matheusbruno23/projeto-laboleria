import { createClientDB} from '../repositories/clients.repository.js';

export async function createClientHandler(req , res) {
    const { name, address, phone } = req.body;

    try {
        await createClientDB(name, address, phone);

        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

}

export async function getClientOrders (req, res){
    
try {
    
} catch (error) {
    
}
}