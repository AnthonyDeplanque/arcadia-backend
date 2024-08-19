const connection = require('../../db-config');
const db = connection.promise();

const dataToRetrieve = ['user_id', 'username', 'nom', 'prenom', 'role_id'];
const userTable = "UTILISATEUR";

const addUserQuery = (values) => {
  return db.query(`INSERT INTO ${userTable} SET ?`, [values]);
};
const getUsersQuery = () => {
  return db.query(`SELECT ${dataToRetrieve.join(', ')} FROM ${userTable}`);
};
const getOneUserQueryById = (value) => {
  return db.query(`SELECT ${dataToRetrieve.join(', ')} FROM ${userTable} WHERE user_id = ? `, [value]);
};
const getHashedPasswordByUsername = (value) => {
  return db.query(`SELECT hashed_password FROM ${userTable} where username = ?`, [value]);
};
const getOneUserQueryByUsername = (value) => {
  return db.query(`SELECT ${dataToRetrieve.join(', ')} FROM ${userTable} WHERE username = ? `, [value]);
};
const getSelectedUserQuery = (first, last) => {
  return db.query(`SELECT ${dataToRetrieve.join(', ')} FROM ${userTable} LIMIT ?, ?`, [first, last]);
};
const updateUserQuery = (id, values) => {
  return db.query(`UPDATE ${userTable} SET ? WHERE user_id = ?`, [values, id]);
};
const deleteUserQuery = (values) => {
  return db.query(`DELETE FROM ${userTable} WHERE user_id = ?`, [values]);
};
module.exports = { getHashedPasswordByUsername, addUserQuery, getUsersQuery, getSelectedUserQuery, getOneUserQueryByUsername, getOneUserQueryById, updateUserQuery, deleteUserQuery };
