function extractRecipes(recipesObj){
    var newRecipeList = [];
    var recipeIds = Object.keys(recipesObj);
    for(var uRC = 0; uRC < recipeIds.length; uRC ++){
        var currentRId = recipeIds[uRC];
        newRecipeList.push(recipesObj[currentRId]);
    }
    return newRecipeList;
}

module.exports = extractRecipes;