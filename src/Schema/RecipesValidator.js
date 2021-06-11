

const validateRecipes = (name, ingredients, preparation) =>{
if(!name || !ingredients || !preparation) return {
    message:"Invalid entries. Try again."
}
return {}
}

module.exports ={
    validateRecipes
}


