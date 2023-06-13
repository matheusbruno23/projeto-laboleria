import { orderSchema } from '../schemas/orders.schema.js';

export function validateOrder(req, res, next) {
  const { error } = orderSchema.validate(req.body, {abortEarly:false});
  if (error) {
    return res.status(400).send({ message: 'Dados inválidos', details: error.details });
  }
  next();
}