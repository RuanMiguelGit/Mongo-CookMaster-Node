const UserModel = require('../models/Users')

const validate = (name, email, password) => {
    const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if(!name || name === null) return {
        message:"Invalid entries. Try again.",
        code:400
    }


if(!email || email === null || !emailValidator.test(email))

return {
    message:"Invalid entries. Try again.",
    code:400,

}

if(!password) return {
    message:"Invalid entries. Try again.",
    code:400

}
 return {}

}

const validateEmail = async (email) => {
    const validate = await  UserModel.uniqueValue(email);
    if (validate !==null ) return {
        message:"Email already registered",
        code:409

    }
    

    return {};
  };
  

module.exports = {
    validate,
    validateEmail
}