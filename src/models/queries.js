const connection = require('../../db-config');
const db = connection.promise();

const addQuery = (table, value) => {
  return db.query(`INSERT INTO ${table} SET ?`, [value]);
};

const getQuery = (table) => {
  return db.query(`SELECT * FROM ${table}`);
};

const getOneQuery = (table, id) => {
  return db.query(`SELECT * FROM ${table} WHERE ${table.toLocaleLowerCase()}_id = ? `, [id]);
};

const updateQuery = (table, id, values) => {
  return db.query(`UPDATE ${table} SET ? WHERE ${table.toLocaleLowerCase()}_id = ?`, [values, id]);
};

const deleteQuery = (table, values) => {
  return db.query(`DELETE FROM ${table} WHERE ${table.toLocaleLowerCase()}_id = ?`, [values]);
};

module.exports = { addQuery, getOneQuery, getQuery, updateQuery, deleteQuery };