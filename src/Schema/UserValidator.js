const UserModel = require('../models/Users');

const validate = (name, email, password) => {
  const emailValidator =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if(!name || name === null) return {
    message:'Invalid entries. Try again.',
    code:400
  };


  if(!email || email === null || !emailValidator.test(email))

    return {
      message:'Invalid entries. Try again.',
      code:400,

    };

  if(!password) return {
    message:'Invalid entries. Try again.',
    code:400

  };
  return {};

};

const validateEmail = async (email) => {
  const validate = await  UserModel.uniqueValue(email);
  if (validate !==null ) return {
    message:'Email already registered',
    code:409

  };
    

  return {};
};
  

module.exports = {
  validate,
  validateEmail
};