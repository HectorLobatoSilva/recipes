import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AddIngredientAction,
  ClearIngredientsAction,
} from 'src/app/actions/shopping-list.actions';
import { Ingredient } from 'src/app/models/ingredient.model';
import { StoreActionsType } from 'src/app/reducers/actions-type';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit {
  shoppingForm: FormGroup;
  constructor(private store: Store<StoreActionsType['shopping']>) {}

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      ingredients: new FormGroup({
        name: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [this.noApples as AsyncValidatorFn],
        }),
        amount: new FormControl(0, [
          Validators.required,
          Validators.min(0),
          this.forbiddenAmount,
        ]),
      }),
    });
  }

  onSubmit() {
    this.store.dispatch(
      AddIngredientAction({
        payload: this.shoppingForm.get('ingredients')?.value,
      })
    );
    this.shoppingForm.reset({
      ingredients: {
        amount: 0,
      },
    });
  }

  onClearShoopingList() {
    this.store.dispatch(ClearIngredientsAction());
  }

  forbiddenAmount(control: FormControl): { [s: string]: boolean } | null {
    if (control.value > 50) {
      return { amountForbidden: true };
    }
    return null;
  }

  noApples(control: FormControl): Promise<any> | Observable<any> {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        if (control.value === 'Apples') {
          resolve({ nameIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
  }
}
