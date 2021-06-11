const UserService = require('../services/Users')



const createUser =  async (req, res) => {
const {name, email, password} = req.body
const { message, data, code} = await UserService.createUser(name, email, password)
if(message) return res.status(code).json({message:message})
if(data) return res.status(201).json({user:{
    
          name: data.name,
          email: data.email,
          role: data.role,
          _id: data._id,
      
}})
}

const login =  async (req, res) => {
const { email, password} = req.body
const {message, token} = await UserService.login(email, password)
if(message) return res.status(401).json({message:message})
return res.status(200).json({token})
}

const recipes =  async (req, res) => {
const { name, ingredients, preparation} = req.body
const {data} = req.user
const {datas, message} = await  UserService.recipes(name, ingredients, preparation, data)
if(message) return res.status(400).json({message:message})
return res.status(201).json({recipe:datas})
}

const recipesAll =  async (req, res) => {
const data = await UserService.recipesAll()
return res.status(200).json(data)
}


const recipesEspc =  async (req, res) => {
const {id} = req.params
const {message, data} = await UserService.recipesEspc(id)
if(message) return res.status(404).json({message:message})
return res.status(200).json(data)
}

const updateRecipe =  async (req, res) => {
const {id} = req.params
const { name, ingredients, preparation } = req.body
const data = await UserService.updateRecipe(id, {name, ingredients, preparation})
return res.status(200).json(data.data)
}
   
const deleteRecipe =  async (req, res) => {
const {id} = req.params
const data = await UserService.deleteRecipe(id)
return res.status(204).json(data)
}

const uploads =  async (req, res) => {
const {id} = req.params
const file = req.file
const url=`localhost:3000/${file.path}`
const data = await UserService.uploads(id, {url})
console.log(file)
return res.status(200).json(data)
}
        
const admin =  async (req, res) => {
    const {name, email, password} = req.body
    console.log(req.user)
    if(req.user.role !=="admin") {
        return res.status(403).json({message:"Only admins can register new admins"})
    }
    const data = await UserService.admin(name, email, password)
    return res.status(201).json({user:{
    name: data.name,
    email: data.email,
    role: data.role,
    _id: data._id
    }})
    }
       


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
}