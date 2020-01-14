import { EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';


export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          "A Test Recipe",
          "This is simply test",
          "https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false"
        ),
        new Recipe(
          "Another Recipe",
          "This is sweet recipe",
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg"
        ),
        new Recipe(
          "Super Recipe",
          "This is super recipe",
          "https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg"
        )
      ];

      getRecipes() {
          //slice it so we return a new array and not modify original
          return this.recipes.slice();
      }
}