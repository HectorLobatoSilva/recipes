import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  backendUrl = 'https://recipes-9ccf1-default-rtdb.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes: Array<Recipe> = this.recipeService.getRecipes();
    this.http
      .put(this.backendUrl, recipes)
      .subscribe((responseData) => console.log({ responseData }));
  }

  fetchRecipes() {
    return this.http
      .get<Array<Recipe>>(this.backendUrl)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe: Recipe) => {
            return { ...recipe, ingredients: recipe.ingredients || [] };
          });
        })
      )
      .pipe(
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
