const jwt = require("jsonwebtoken");
const {expressjwt} = require('express-jwt');

const createToken = (payload) => {
  const token = jwt.sign(
    { data:payload, 
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) },
    process.env.JWT_KEY
  );
  console.log(token);
  return token;
};

const authWithJwt = expressjwt(
  {
  secret : process.env.JWT_KEY,
  algorithms:['HS256']
  });

module.exports = {
  createToken,
  authWithJwt
}