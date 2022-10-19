import { Action, createReducer, on } from '@ngrx/store';
import {
  AddManyRecipesAction,
  AddRecipeAction,
  DeleteRecipeAction,
  UpdateRecipeAction,
} from '../actions/recipes.actions';
import { Recipe } from '../models/recipe.model';

const initialState: { recipes: Recipe[] } = {
  recipes: [],
};

function findIndex(uid: string, recipes: Recipe[]) {
  return recipes.findIndex((recipe: Recipe) => recipe.id === uid);
}

const reducer = createReducer(
  initialState,
  on(AddRecipeAction, (state, action) => {
    return { ...state, recipes: [...state.recipes, action.payload] };
  }),
  on(UpdateRecipeAction, (state, action) => {
    const { uid, recipe } = action.payload;
    const recipes = [...state.recipes];
    const index = findIndex(uid, recipes);
    recipes[index] = recipe;
    return { ...state, recipes };
  }),
  on(DeleteRecipeAction, (state, action) => {
    const { uid } = action.payload;
    const recipes = [...state.recipes];
    const index = findIndex(uid, recipes);
    recipes.splice(index, 1);
    return { ...state, recipes };
  }),
  on(AddManyRecipesAction, (state, action) => {
    return { ...state, recipes: [...state.recipes, ...action.payload] };
  })
);

export function recipesReducer(state = initialState, action: Action) {
  return reducer(state, action);
}
