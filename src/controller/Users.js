const UserService = require('../services/Users');

const created = 201;
const notAuth = 401;
const badReq = 400;
const sucess = 200;
const notFound = 404;
const acessDenied = 403;
const noContent = noContent;

const createUser =  async (req, res) => {
  const {name, email, password} = req.body;
  const { message, data, code} = await UserService.createUser(name, email, password);
  if(message) return res.status(code).json({message:message});
  if(data) return res.status(created).json({user:{
    
    name: data.name,
    email: data.email,
    role: data.role,
    _id: data._id,
      
  }});
};

const login =  async (req, res) => {
  const { email, password} = req.body;
  const {message, token} = await UserService.login(email, password);
  if(message) return res.status(notAuth).json({message:message});
  return res.status(sucess).json({token});
};

const recipes =  async (req, res) => {
  const { name, ingredients, preparation} = req.body;
  const {data} = req.user;
  const {datas, message} =
  await  UserService.recipes(name, ingredients, preparation, data);
  if(message) return res.status(badReq).json({message:message});
  return res.status(created).json({recipe:datas});
};

const recipesAll =  async (req, res) => {
  const data = await UserService.recipesAll();
  return res.status(sucess).json(data);
};


const recipesEspc =  async (req, res) => {
  const {id} = req.params;
  const {message, data} = await UserService.recipesEspc(id);
  if(message) return res.status(notFound).json({message:message});
  return res.status(sucess).json(data);
};

const updateRecipe =  async (req, res) => {
  const {id} = req.params;
  const { name, ingredients, preparation } = req.body;
  const data = await UserService.updateRecipe(id, {name, ingredients, preparation});
  return res.status(sucess).json(data.data);
};
   
const deleteRecipe =  async (req, res) => {
  const {id} = req.params;
  const data = await UserService.deleteRecipe(id);
  return res.status(noContent).json(data);
};

const uploads =  async (req, res) => {
  const {id} = req.params;
  const file = req.file;
  const url=`localhost:3000/${file.path}`;
  const data = await UserService.uploads(id, {url});
  console.log(file);
  return res.status(sucess).json(data);
};
        
const admin =  async (req, res) => {
  const {name, email, password} = req.body;
  console.log(req.user);
  if(req.user.role !=='admin') {
    return res.status(acessDenied).json({message:'Only admins can register new admins'});
  }
  const data = await UserService.admin(name, email, password);
  return res.status(created).json({user:{
    name: data.name,
    email: data.email,
    role: data.role,
    _id: data._id
  }});
};
       

const image =  async (req, res) => {

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
  admin,
  image
};