const connection = require('./connections');
const { ObjectId, MongoError, connect, } = require('mongodb');

const createUser = async (name, email, password,) => {
  const data  = await connection()
    .then((db) =>  
      db.collection('users').insertOne({name, email, password, role:'user',}))
    .then((result) => result );
  return data.ops[0];
};

const uniqueValue = async (email) => {
  const info = await connection()
    .then((db) => db.collection('users').findOne({ email: email }))
    .then((result)=> result);
  return info;   
};

const clients = async (email, password) => {
  const data = await connection()
    .then((db) => db.collection('users').findOne({email:email, password:password}))
    .then((result)=> result);
  return data;   
};

const recipes = async (name, ingredients, preparation, data)=> {
  const datas = await connection()
    .then((db) => 
      db.collection('recipes').insertOne({name, ingredients, preparation, userId:data}))
    .then((result) => result);
  return datas.ops[0];
};

const recipesAll= async ()=> {
  const data = await connection()
    .then((db) => db.collection('recipes').find({}).toArray())
    .then((result) => result);
  return data;
};

const recipesEspc = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  const data = await connection()
    .then((db) => db.collection('recipes').findOne({_id: new ObjectId(id)}))
    .then((result) => result);
  return data;
};


const updateRecipe = async (id, {name, ingredients, preparation}) => {
  const data = await connection()
    .then((db) =>
      db.collection('recipes').
        findOneAndUpdate({ _id:  ObjectId(id) }, {$set:{name, ingredients, preparation}},
          {returnOriginal:false}))
    .then((result) => result.value);
  return data;
};

const deleteRecipe = async (id) => {
  const data = await connection()
    .then((db) => db.collection('recipes').deleteOne({ _id:  ObjectId(id) }))
    .then((result) => result.value);
  return data;
};

const uploads = async (id, {url}) => {
  const data = await connection()
    .then((db) =>
      db.collection('recipes').
        findOneAndUpdate({ _id:  ObjectId(id) }, {$set:{image:url}},
          {returnOriginal:false}))
    .then((result) => result.value);
  return data;
};

const admin = async (name, email, password,) => {
  const data  = await connection()
    .then((db) => 
      db.collection('users').insertOne({name, email, password, role:'admin',}))
    .then((result) => result );
  return data.ops[0];
};


module.exports = {
  createUser, 
  uniqueValue,
  clients,
  recipes,
  recipesAll,
  recipesEspc,
  updateRecipe,
  deleteRecipe,
  uploads,
  admin
};