const Joi = require('joi');

const postUserValidationObject = {
  username: Joi.string().max(150).required(),
  hashed_password: Joi.string().max(150).required(),
  nom: Joi.string().max(50).required(),
  prenom: Joi.string().max(50).required(),
  role_id: Joi.number().required(),
}

const updateUserValidationObject = {
  username: Joi.string().max(150),
  hashed_password: Joi.string().max(150),
  nom: Joi.string().max(50),
  prenom: Joi.string().max(50),
  role_id: Joi.number(),
}

module.exports = { postUserValidationObject, updateUserValidationObject };