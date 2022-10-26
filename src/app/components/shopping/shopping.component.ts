import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DeleteIngredientAction } from 'src/app/actions/shopping-list.actions';
import { Ingredient } from 'src/app/models/ingredient.model';
import { StoreActionsType } from 'src/app/reducers/actions-type';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(private store: Store<StoreActionsType['shopping']>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy(): void {}

  onDeleteIngredient(id: number) {
    this.store.dispatch(DeleteIngredientAction({ paylod: id }));
  }
}
