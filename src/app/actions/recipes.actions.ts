import { createAction, props } from '@ngrx/store';
import { Recipe } from '../models/recipe.model';
import { RecipesActionTypes } from '../reducers/actions-type';

export const AddRecipeAction = createAction(
  RecipesActionTypes.ADD_RECIPE,
  props<{ payload: Recipe }>()
);

export const UpdateRecipeAction = createAction(
  RecipesActionTypes.UPDATE_RECIPE,
  props<{ payload: { uid: string; recipe: Recipe } }>()
);

export const DeleteRecipeAction = createAction(
  RecipesActionTypes.DELETE_RECIPE,
  props<{ payload: { uid: string } }>()
);

export const AddManyRecipesAction = createAction(
  RecipesActionTypes.ADD_MANY_RECIPES,
  props<{ payload: Recipe[] }>()
);
