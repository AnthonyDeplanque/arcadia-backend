const Joi = require("joi");
const usersModel = require("../models/users");
const usersMiddleware = require("../middlewares/users");
const argon2 = require("argon2");
const jwtServices = require('../services/jwt');

const postUser = async (req, res) => {
    console.log("Post Users")

  const {
username, password, nom, prenom, role_id,
  } = req.body;
  const hashed_password = await argon2.hash(password);
  const { error } = Joi.object(
    usersMiddleware.postUserValidationObject
  ).validate(
    {
        username, hashed_password, nom, prenom, role_id,
    },
    { abortEarly: false }
  );
  if (error) {
    console.error(error);
    res.status(422).json({ validationError: error.details });
  } else {
    usersModel
      .getOneUserQueryByUsername(username)
      .then(([results]) => {
        if (results.length) {
          res.status(409).send("user already exist with this username");
        } else {
          usersModel
            .addUserQuery({
                username, hashed_password, nom, prenom, role_id,
            })
            .then((results) => {
              const createdUser = {
                username, hashed_password, nom, prenom, role_id,
              };
              res.status(201).json(createdUser);
            })
            .catch((err) => {
              console.error(err);
              res.status(500).send("error creating a user");
            });
        }
      })
      .catch((err) => console.error(err));
  }
};

const loginUser = (req, res) => {
    console.log("Login Users")

  const { credentialUsername, credentialPassword } = req.body;
  usersModel
    .getHashedPasswordByUsername(credentialUsername)
    .then(async ([[result]]) => {
      argon2
        .verify(result.hashed_password, credentialPassword)
        .then((match) => {
          if (match) {
            usersModel
            .getOneUserQueryByUsername(credentialUsername)
            .then(([[results]]) => {
                const token = jwtServices.createToken(results.id)
                res.status(200).json({...results, token:token, message: "ACCESS_GRANTED" });
              });
          } else {
            res.status(401).json({ message: "ACCESS_DENIED" });
          }
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

const getUsers = (req, res) => {
    console.log("Get Users")
  const { nom, prenom, username } = req.query;
  if (username) {
    usersModel
      .getOneUserQueryByUsername(username)
      .then(([results]) => res.status(200).json(results))
      .catch((err) => console.error(err));
  }
  if (nom && prenom) {
    usersModel
      .getSelectedUserQuery(parseInt(nom), parseInt(prenom))
      .then(([results]) => res.status(200).json(results))
      .catch((err) => console.error(err));
  } else {
    usersModel
      .getUsersQuery()
      .then(([results]) => res.status(200).json(results))
      .catch((err) => console.error(err));
  }
};

const getOneUser = (req, res) => {
    console.log("Get One User")
  const { id } = req.params;
  usersModel
    .getOneUserQueryById(id)
    .then(([results]) => res.status(200).json(results))
    .catch((err) => console.error(err));
};

const updateUser = (req, res) => {
    console.log("Update Users")

  const { id } = req.params;
  let validationErrors = null;
  usersModel
    .getOneUserQueryById(id)
    .then((results) => {
      if (!results) {
        return Promise.reject("RECORD_NOT_FOUND");
      }
      validationErrors = Joi.object(
        usersMiddleware.updateUserValidationObject
      ).validate(req.body, { abortEarly: false }).error;
      if (validationErrors) {
        return Promise.reject("INVALID_DATA");
      }
      return results;
    })
    .then(() => {
      usersModel
        .updateUserQuery(id, req.body)
        .then((results) => {
          if (results.affectedRows === 0) {
            throw new Error("RECORD_NOT_FOUND");
          }
          res.status(200).json({ ...results, ...req.body });
        })
        .catch((err) => {
          console.error(err);
          if (err.message === "RECORD_NOT_FOUND") {
            res.status(404).send(`User with id ${id} not found`);
          }
        });
    })
    .catch((err) => {
      if (err.message === "INVALID_DATA") {
        res.status(422).json({ validationErrors });
      } else res.status(500).send("error updating a User");
    });
};

const deleteUser = (req, res) => {
    console.log("Delete Users")
  
    const { id } = req.params;
  usersModel
    .deleteUserQuery(id)
    .then((results) => {
      if (results) res.status(200).send("User deleted");
      else res.status(404).send("User not found");
    })
    .catch((err) => console.error(err));
};

module.exports = {
  loginUser,
  postUser,
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
