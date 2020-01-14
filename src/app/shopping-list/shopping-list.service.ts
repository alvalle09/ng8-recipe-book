import { Ingredient } from '../Shared/ingredient.model';

export class ShoppingListService {

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 20),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Lettuce', 10)
      ];

      getIngredients() {
        return this.ingredients.slice();
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
      }
}