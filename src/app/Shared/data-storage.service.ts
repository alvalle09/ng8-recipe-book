import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Recipe } from '../recipes/recipe.model';

// optional syntax to avoid setting up in app module providers array
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http:HttpClient) {}

    storeRecipes(recipes: Recipe[]) {

    }
}