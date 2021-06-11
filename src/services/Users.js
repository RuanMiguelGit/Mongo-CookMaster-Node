const UserModel = require('../models/Users');
const UserSchema = require('../Schema/UserValidator');
const LoginSchema = require('../Schema/LoginValidator');
const RecipesSchema = require('../Schema/RecipesValidator');

const createUser = async  (name, email, password) => {
  const validate =  UserSchema.validate(name, email, password);
  if(validate.message) return validate;
  const validateEmail = await UserSchema.validateEmail(email);
  if(validateEmail.message) return validateEmail;
  const data = await UserModel.createUser(name, email, password);
  return {data}; 
};

const login =  async (email, password) => {
  const {message, token} = await LoginSchema.validateUser(email, password);
  if(message) return {message};
   
  return {token};
};

const recipes =  async (name, ingredients, preparation, data) => {
  const validation = await RecipesSchema.validateRecipes(name, ingredients, preparation);
  if(validation.message) return validation;
  const datas = await UserModel.recipes(name, ingredients, preparation, data);
  return {datas};   
};

const recipesAll =  async () => {
  const data = await UserModel.recipesAll();
  return data; 
};

const recipesEspc =  async (id) => {
  const data = await UserModel.recipesEspc(id);
  if(data === null) return {
    message: 'recipe not found'
  };
  return {data};
};


const updateRecipe =  async (id, {name, ingredients, preparation}) => {
  const data = await UserModel.updateRecipe(id, {name, ingredients, preparation});
  return {data};
};

const deleteRecipe =  async (id) => {
  const data = await UserModel.deleteRecipe(id);
  return data;
};

const uploads =  async (id, {url}) => {
  const data = await UserModel.uploads(id, {url});
  return data;
};

const admin = async  (name, email, password) => {

  const data = await UserModel.admin(name, email, password);
  return data; 
};



module.exports = {
  createUser,
  login,
  recipes,
  recipesAll,
  recipesEspc,
  updateRecipe,
  deleteRecipe,
  uploads,
  admin
};