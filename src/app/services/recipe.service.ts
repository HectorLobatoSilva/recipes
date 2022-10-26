import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { map, Subject, tap } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { v4 as uuid } from 'uuid';
import { Store } from '@ngrx/store';
import { AddManyIngredientsAction } from '../actions/shopping-list.actions';
import { StoreActionsType } from '../reducers/actions-type';
import {
  AddManyRecipesAction,
  AddRecipeAction,
  DeleteRecipeAction,
  UpdateRecipeAction,
} from '../actions/recipes.actions';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  currentRecipeID: number = 4;

  constructor(
    private db: AngularFireDatabase,
    private store: Store<{
      shoppingList: StoreActionsType['shopping']['shoppingList'];
      recipe: StoreActionsType['recipe']['recipes'];
    }>
  ) {}

  // recipesChanged = new Subject<Array<Recipe>>();
  // recipeSelected = new Subject<Recipe>();
  // recipeError = new Subject<string>();

  // recipes: Array<Recipe> = [];

  addIngredientsToShoopingList(ingredients: Array<Ingredient>) {
    this.store.dispatch(
      AddManyIngredientsAction({
        payload: ingredients,
      })
    );
  }

  getRecipeByID(id: string) {
    const index = this.findIndex(id);
    // return this.recipes[index];
  }

  getRecipes() {
    // return [...this.recipes];
  }

  makeRef(id?: string) {
    return this.db.object(
      `users/${sessionStorage.getItem('token')}/${id ? id : ''}`
    );
  }

  findIndex(id: string) {
    // return this.recipes.findIndex((recipe: Recipe) => recipe.id === id);
  }

  clearRecipes() {
    // this.recipes = [];
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
          this.store.dispatch(AddManyRecipesAction({ payload: recipes }));
        })
      );
  }

  addNewRecipe(recipe: Recipe) {
    const id = uuid();
    recipe.id = id;
    this.makeRef(id)
      .update(recipe)
      .then(() => {
        this.store.dispatch(AddRecipeAction({ payload: recipe }));
      });
  }

  updateRecipe(body: Recipe) {
    const { id } = body;
    this.makeRef(id)
      .update(body)
      .then(() => {
        this.store.dispatch(
          UpdateRecipeAction({ payload: { uid: id!, recipe: body } })
        );
      });
  }

  deleteRecipe(id: string) {
    this.makeRef(id)
      .remove()
      .then(() => {
        this.store.dispatch(DeleteRecipeAction({ payload: { uid: id } }));
      });
  }
}
