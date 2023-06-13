import {db} from "../database/db.connection.js"

export function getCakeByNameDB(name) {
    return db.query (`SELECT * FROM cakes WHERE name =$1;` , [name])
}
  
export function createCakeDB(name, price, image, description) {
    return db.query(`INSERT INTO cakes (name, price, image , description) VALUES ($1 , $2, $3, $4);` ,
    [name, price, image , description])
}