import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {
  @Input() ingredients: Array<Ingredient> = [];
  @Input() service: ShoppingListService | any = null;
  constructor() {}

  ngOnInit(): void {}

  delete(id: number) {
    if (typeof this.service !== 'function') {
      this.service.onDeleteIngredientByID(id);
    } else {
      this.service(id);
    }
  }
}
