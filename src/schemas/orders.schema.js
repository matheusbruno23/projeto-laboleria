import Joi from 'joi';

export const orderSchema = Joi.object({
  clientId: Joi.number().integer().positive().required(),
  cakeId: Joi.number().integer().positive().required(),
  quantity: Joi.number().integer().min(1).max(4).required(),
  totalPrice: Joi.number().positive(),
  createdAt: Joi.date().timestamp()
});
