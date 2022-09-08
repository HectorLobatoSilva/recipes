import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  currentRecipeID: number = 4;
  constructor(private shoppingListService: ShoppingListService) {}

  recipesChanged = new Subject<Array<Recipe>>();
  recipeSelected = new Subject<Recipe>();

  recipes: Array<Recipe> = [
    new Recipe(
      1,
      'A test recipe1',
      'Simple test',
      'https://i.gifer.com/WUis.gif',
      [new Ingredient(1, 'Meat', 1)]
    ),
    new Recipe(
      2,
      'A test recipe2',
      'Simple test',
      'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg',
      [new Ingredient(1, 'Tomato', 5), new Ingredient(2, 'Apple', 15)]
    ),
    new Recipe(
      3,
      'A test recipe3',
      'Simple test',
      'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg',
      [new Ingredient(1, 'Buns', 12)]
    ),
  ];

  getRecipes() {
    return [...this.recipes];
  }

  getById(id: number): Recipe {
    const index = this.findByID(id);
    return this.recipes[index];
  }

  findByID(id: number): number {
    return this.recipes.findIndex((recipe: Recipe) => recipe.id === id);
  }

  addNewRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
  }

  addIngredientsToShoopingList(ingredients: Array<Ingredient>) {
    this.shoppingListService.addRecipeIngredients(ingredients);
  }

  generateID(): number {
    this.currentRecipeID++;
    return this.currentRecipeID;
  }

  updateRecipe(recipe: Recipe) {
    const index = this.findByID(recipe.id);
    this.recipes[index] = recipe;
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe(id: number) {
    const index = this.findByID(id);
    this.recipes.splice(index, 1);
    this.recipesChanged.next([...this.recipes]);
  }
}
