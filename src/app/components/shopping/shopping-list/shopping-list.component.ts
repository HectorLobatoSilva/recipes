import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
})
export class ShoppingListComponent implements OnInit {
  @Input() ingredients: Observable<{ ingredients: Ingredient[] }>;
  @Output() onDelete = new Subject<number>();
  constructor() {}

  ngOnInit(): void {}

  delete(id: number) {
    this.onDelete.next(id);
  }
}
