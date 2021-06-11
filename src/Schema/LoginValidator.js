const UserModel = require('../models/Users');
const jwt = require('jsonwebtoken');
const secret = 'seusecretdetoken';

const validateUser  = async (email, password) => {
  if( !email || !password) return {
    message:'All fields must be filled'
  };
  const user = await UserModel.clients(email, password);


  if(!user || user.email !== email ||user.password !== password) return {
    message:'Incorrect username or password'
  };

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const {_id, role} = user;


  const token = jwt.sign({ data: _id, email, role }, secret, jwtConfig);
  return { token };
    
};

module.exports = {
  validateUser
};