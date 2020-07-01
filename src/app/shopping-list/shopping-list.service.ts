import { Ingredient } from '../Shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    // inform other components new ingredient has been added
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 20),
        new Ingredient('Tomatoes', 10),
        new Ingredient('Lettuce', 10)
      ];

      getIngredients() {
        // working with a copy of ingredients array, not actual array
        return this.ingredients.slice();
      }

      getIngredient(index: number) {
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredients(ingredients: Ingredient[]) {
        // This code will work, but emits too many events
        // for (let ingredient of ingredients) {
        //   this.addIngredient(ingredient);
        // }

        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}


