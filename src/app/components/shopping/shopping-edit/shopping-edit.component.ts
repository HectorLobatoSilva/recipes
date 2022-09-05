import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.shoppingListService.addIngredient(form.value as Ingredient);
    form.reset();
  }

  onClearShoopingList() {
    this.shoppingListService.clearShoppinList();
  }
}
