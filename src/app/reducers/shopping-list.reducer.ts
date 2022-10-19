import { Action, createReducer, on } from '@ngrx/store';
import {
  AddIngredientAction,
  AddManyIngredientsAction,
  ClearIngredientsAction,
  DeleteIngredientAction,
} from '../actions/shopping-list.actions';
import { Ingredient } from '../models/ingredient.model';

const initialState: { ingredients: Ingredient[] } = {
  ingredients: [
    // new Ingredient('Apples', 5),
    // new Ingredient('Tomatoes', 10),
    // new Ingredient('Meat', 15),
  ],
};

const reducer = createReducer(
  initialState,
  on(AddIngredientAction, (state, action) => {
    return { ...state, ingredients: [...state.ingredients, action.payload] };
  }),
  on(DeleteIngredientAction, (state, action) => {
    const ingredients = [...state.ingredients];
    ingredients.splice(action.paylod, 1);
    return {
      ...state,
      ingredients,
    };
  }),
  on(ClearIngredientsAction, (state) => {
    return {
      ...state,
      ingredients: [],
    };
  }),
  on(AddManyIngredientsAction, (state, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, ...action.payload],
    };
  })
);

export function shoppingListReducer(state = initialState, action: Action) {
  return reducer(state, action);
}
