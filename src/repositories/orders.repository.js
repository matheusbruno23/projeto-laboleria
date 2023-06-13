import {db} from "../database/db.connection.js"


export function createOrderDB(clientId, cakeId, quantity, totalPrice) {
    return db.query(`
      INSERT INTO orders (client_id, cake_id, quantity, total_price, created_at)
      VALUES ($1, $2, $3, $4, NOW());
    `, [clientId, cakeId, quantity, totalPrice]);
  }
  