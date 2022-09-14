import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  currentRecipeID: number = 4;

  backendUrl = 'https://recipes-9ccf1-default-rtdb.firebaseio.com';

  constructor(
    private shoppingListService: ShoppingListService,
    private http: HttpClient
  ) {}

  recipesChanged = new Subject<Array<Recipe>>();
  recipeSelected = new Subject<Recipe>();
  recipeError = new Subject<string>();

  recipes: Array<Recipe> = [
    // new Recipe(
    //   'A test recipe1',
    //   'Simple test',
    //   'https://i.gifer.com/WUis.gif',
    //   [new Ingredient(1, 'Meat', 1)]
    // ),
    // new Recipe(
    //   'A test recipe2',
    //   'Simple test',
    //   'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg',
    //   [new Ingredient(1, 'Tomato', 5), new Ingredient(2, 'Apple', 15)]
    // ),
    // new Recipe(
    //   'A test recipe3',
    //   'Simple test',
    //   'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg',
    //   [new Ingredient(1, 'Buns', 12)]
    // ),
  ];

  headers = new HttpHeaders({});

  addNewRecipe(recipe: Recipe) {
    this.http
      .post(`${this.backendUrl}/recipes.json`, recipe)
      .pipe(
        map((response) => {
          return Object.assign(response)['name'];
        })
      )
      .subscribe((recipeId) => {
        recipe['id'] = recipeId;
        this.recipes.push(recipe);
        this.recipesChanged.next([...this.recipes]);
      });
  }

  addIngredientsToShoopingList(ingredients: Array<Ingredient>) {
    this.shoppingListService.addRecipeIngredients(ingredients);
  }

  getRecipeByID(id: string) {
    const index = this.findIndex(id);
    return this.recipes[index];
  }

  getRecipes() {
    return [...this.recipes];
  }

  // fetchByID(id: string) {
  //   return this.http.get<Recipe>(`${this.backendUrl}/recipes/${id}.json`);
  // }

  fetchRecipes() {
    return this.http
      .get<Array<Recipe>>(`${this.backendUrl}/recipes.json`)
      .pipe(
        map((data: Object) => {
          const recipesArray: Array<Recipe> = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const recipe = Object.assign(data[key as keyof Object]) as Recipe;
              recipe.id = key;
              recipesArray.push(recipe);
            }
          }
          return recipesArray;
        })
      )
      .pipe(
        tap((recipes: Array<Recipe>) => {
          this.recipes = recipes;
          this.recipesChanged.next([...this.recipes]);
        })
      );
  }

  updateRecipe(body: Recipe) {
    this.http
      .put<Recipe>(`${this.backendUrl}/recipes/${body.id}.json`, body)
      .subscribe(() => {
        const index = this.findIndex(body.id!);
        this.recipes[index] = body;
        this.recipesChanged.next([...this.recipes]);
      });
  }

  deleteRecipe(id: string) {
    return this.http
      .delete(`${this.backendUrl}/recipes/${id}.json`)
      .subscribe(() => {
        const index = this.findIndex(id);
        this.recipes.splice(index, 1);
        this.recipesChanged.next([...this.recipes]);
      });
  }

  findIndex(id: string) {
    return this.recipes.findIndex((recipe: Recipe) => recipe.id === id);
  }
}
