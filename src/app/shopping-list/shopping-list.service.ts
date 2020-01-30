import { EventEmitter } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';

export class ShoppingListService {
    // inform other components new ingredient has been added
    ingredientChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 20),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Lettuce', 10)
      ];

      getIngredients() {
        // working with a copy of ingredients array, not actual array
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.emit(this.ingredients.slice());
      }
}


