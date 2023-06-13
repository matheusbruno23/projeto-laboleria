import {  createCakeDB , getCakeByNameDB} from '../repositories/cakes.repository.js';


export async function createCakeHandler(req, res) {
    const { name, price, image, description } = req.body;
  
    try {
      const existingCake = await getCakeByNameDB(name);

      if (existingCake.rowCount !== 0 ) return res.status(409).send({message: 'O bolo já existe'});
      

      await createCakeDB(name, price, image, description);
  
      return res.sendStatus(201);

    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }