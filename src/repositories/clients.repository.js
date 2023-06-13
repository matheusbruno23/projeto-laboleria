import {db} from "../database/db.connection.js"

export function createClientDB(name, address, phone) {
    return db.query(`INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3);`,
     [name, address, phone]);
  }

  export function getClientById(clientId){
    return db.query(`SELECT * FROM clients WHERE id=$1;` , [clientId])
}
