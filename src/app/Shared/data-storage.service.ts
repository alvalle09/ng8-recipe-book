import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { RecipeService } from "../recipes/recipe.service";

// optional syntax to avoid setting up in app module providers array
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http:HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
    }
}