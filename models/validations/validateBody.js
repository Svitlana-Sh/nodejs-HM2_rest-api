const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string().min(2).max(30).required().email(),
  phone: Joi.alternatives([Joi.string(), Joi.number()]).required(),
});

module.exports = contactsSchema;