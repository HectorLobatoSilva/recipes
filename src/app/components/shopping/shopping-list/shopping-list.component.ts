import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {
  @Input() ingredients: Array<Ingredient> = [];
  @Output() onDelete = new Subject<number>();
  constructor() {}

  ngOnInit(): void {}

  delete(id: number) {
    this.onDelete.next(id);
  }
}
