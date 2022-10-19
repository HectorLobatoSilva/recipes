import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../models/ingredient.model';
import { IngredientActionTypes } from '../reducers/actions-type';

export const AddIngredientAction = createAction(
  IngredientActionTypes.ADD_INGREDIENT,
  props<{ payload: Ingredient }>()
);

export const DeleteIngredientAction = createAction(
  IngredientActionTypes.DELETE_INGREDIENT,
  props<{ paylod: number }>()
);

export const ClearIngredientsAction = createAction(
  IngredientActionTypes.CLEAR_INGREDIENTS
);

export const AddManyIngredientsAction = createAction(
  IngredientActionTypes.ADD_MANY_INGREDIENTS,
  props<{ payload: Ingredient[] }>()
);
