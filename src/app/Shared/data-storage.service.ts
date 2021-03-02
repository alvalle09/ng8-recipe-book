import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map } from 'rxjs/operators';

// optional syntax to avoid setting up in app module providers array
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http:HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();

        this.http
            .put('https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http
            .get<Recipe[]>('https://ng-complete-guide-d4625-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
                })
            }))
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            });
    }
}


