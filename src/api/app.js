const express = require('express');

const defineUser = require('../controller/Users')
const bodyParser = require('body-parser')
const ValidateJwt = require('../middleware/auth')
const admins = require('../middleware/auth')

const app = express();
app.use(bodyParser.json())
const multer = require('multer')
app.use("/images", express.static(__dirname + '/images'));

const storage = multer.diskStorage({
    destination:(req, file, callback) =>{
        callback(null, 'images/');
    },
    filename:(req, file, callback) =>{
      const {id} = req.params
        callback(null,  id + '.jpeg' )
    }
})
const upload = multer({storage})

app.get('/', (request, response) => {
  response.send();
});

app.post('/users', defineUser.createUser );
app.post('/login', defineUser.login );
app.get('/recipes',  defineUser.recipesAll );
app.get('/recipes/:id',  defineUser.recipesEspc );
app.put('/recipes/:id',ValidateJwt, defineUser.updateRecipe)
app.delete('/recipes/:id',ValidateJwt, defineUser.deleteRecipe)
app.post('/recipes', ValidateJwt, defineUser.recipes );
app.put('/recipes/:id/image/', ValidateJwt,  upload.single('image'), defineUser.uploads)
app.post('/users/admin',  ValidateJwt, defineUser.admin)




module.exports = app;
