import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

export class IngredientActionTypes {
  static readonly ADD_INGREDIENT = 'ADD_INGREDIENT';
  static readonly DELETE_INGREDIENT = 'DELETE_INGREDIENT';
  static readonly CLEAR_INGREDIENTS = 'CLEAR_INGREDIENTS';
  static readonly ADD_MANY_INGREDIENTS = 'ADD_MANY_INGREDIENTS';
}

export class RecipesActionTypes {
  static readonly ADD_RECIPE = 'ADD_RECIPE';
  static readonly DELETE_RECIPE = 'DELETE_RECIPE';
  static readonly UPDATE_RECIPE = 'UPDATE_RECIPE';
  static readonly ADD_MANY_RECIPES = 'ADD_MANY_RECIPES';
}

export type StoreActionsType = {
  shopping: {
    shoppingList: { ingredients: Ingredient[] };
  };
  recipe: {
    recipes: { recipes: Recipe[] };
  };
};
