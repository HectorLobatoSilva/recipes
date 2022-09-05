import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  private ingredients: Array<Ingredient> = [
    // new Ingredient(1, 'potato', 12),
    // new Ingredient(2, 'potato', 12),
    // new Ingredient(3, 'potato', 12),
    // new Ingredient(4, 'potato', 12),
    // new Ingredient(5, 'potato', 12),
    // new Ingredient(6, 'potato', 12),
  ];

  ingredientsChanged = new Subject<Array<Ingredient>>();
  clearShoppingList = new Subject<void>();

  getIngredients(): Array<Ingredient> {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    if (ingredient.name && ingredient.amount) {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next([...this.ingredients]);
    } else {
      alert('No ingredient added');
    }
  }

  clearShoppinList() {
    this.ingredients = [];
    this.clearShoppingList.next();
  }

  addRecipeIngredients(ingredients: Array<Ingredient>) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(ingredients);
  }

  onDeleteIngredientByID(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsChanged.next([...this.ingredients]);
  }
}
