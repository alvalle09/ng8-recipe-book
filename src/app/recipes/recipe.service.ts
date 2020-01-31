import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
          "Beef Kabobs",
          "A delicious beef meal cooked over a coal fire.",
          "https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false",
          [
            new Ingredient('Meat', 10), 
            new Ingredient('Kabob sticks', 10),
            new Ingredient('Veggies', 30)
          ]
        ),
        new Recipe(
          "Shrimp Salad",
          "Suculent shrimp with...",
          "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg",
          [
            new Ingredient('Shrimp', 12), 
            new Ingredient('Noodles', 1)
          ]
        ),
        new Recipe(
          "Chicken bbq delight",
          "Pan roasted sweet chilli with lime",
          "https://assets.bonappetit.com/photos/5d7296eec4af4d0008ad1263/master/pass/Basically-Gojuchang-Chicken-Recipe-Wide.jpg",
          [
            new Ingredient('Chicken', 10), 
            new Ingredient('Chilli', 10),
          ]
        )
      ];

      constructor(private slService: ShoppingListService) {}

      getRecipes() {
          //slice it so we return a new array and not modify original
          return this.recipes.slice();
      }

      addIngredientToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }


}