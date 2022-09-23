import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';
import { v4 as uuid } from 'uuid';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  currentRecipeID: number = 4;

  constructor(
    private shoppingListService: ShoppingListService,
    private db: AngularFireDatabase
  ) {}

  recipesChanged = new Subject<Array<Recipe>>();
  recipeSelected = new Subject<Recipe>();
  recipeError = new Subject<string>();

  recipes: Array<Recipe> = [
    //   'https://i.gifer.com/WUis.gif',
    //   'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg',
    //   'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg',
  ];

  addNewRecipe(recipe: Recipe) {
    const id = uuid();
    delete recipe.id;
    this.makeRef(id)
      .update(recipe)
      .then(() => {
        recipe.id = id;
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

  makeRef(id?: string) {
    return this.db.object(
      `users/${sessionStorage.getItem('token')}/${id ? id : ''}`
    );
  }

  fetchRecipes() {
    return this.makeRef()
      .valueChanges()
      .pipe(
        map((items: unknown) => {
          const recipesArray: Array<Recipe> = [];
          const data = items as Object;
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
    const { id } = body;
    delete body.id;
    this.makeRef(id)
      .update(body)
      .then(() => {
        const index = this.findIndex(id!);
        this.recipes[index] = body;
        this.recipesChanged.next([...this.recipes]);
      });
  }

  deleteRecipe(id: string) {
    this.makeRef(id)
      .remove()
      .then(() => {
        const index = this.findIndex(id);
        this.recipes.splice(index, 1);
        this.recipesChanged.next([...this.recipes]);
      });
  }

  findIndex(id: string) {
    return this.recipes.findIndex((recipe: Recipe) => recipe.id === id);
  }

  clearRecipes() {
    this.recipes = [];
  }
}
