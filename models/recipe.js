var idGen = require("uniqid");
function newRecipe(recipeVals){
    var newRecipeModel={
        "id" : recipeVals.id || uniqId("r-"),
        "ownerId" : recipeVals.ownerId,
        "ovenTemp" : recipeVals.ovenTemp || "", 
        "cookTime" : recipeVals.cookTime || "",
        "recipeType" : recipeVals.recipeType || "",
        "name" : recipeVals.name || "(No name)",
        "ingredients" : recipeVals.ingredients || "",
        "steps" : recipeVals.steps || ""
    };
    return newRecipeModel;
}

module.exports = newRecipe;