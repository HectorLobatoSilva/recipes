import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredients: Array<Ingredient> = [];
  private subscription: Subscription;
  constructor(protected shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Array<Ingredient>) => (this.ingredients = [...ingredients])
    );
    this.shoppingListService.clearShoppingList.subscribe(
      () => (this.ingredients = [])
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDeleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
  }
}
