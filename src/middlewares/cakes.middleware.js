import { cakeSchema } from '../schemas/cakes.schema.js';

export function validateCake(req, res, next) {
  const { error } = cakeSchema.validate(req.body , {abortEarly:false});
  if (error) {
    return res.status(400).send({ message: 'Dados inválidos', details: error.details });
  }
  next();
}
