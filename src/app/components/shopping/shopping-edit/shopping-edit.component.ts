import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit {
  shoppingForm: FormGroup;
  constructor(private shoppingListService: ShoppingListService) {}

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

    // this.shoppingForm.valueChanges.subscribe((value) => console.log(value));
    // this.shoppingForm.statusChanges.subscribe((status) => console.log(status));

    // this.shoppingForm.setValue({
    //   ingredients: {
    //     name: '',
    //     amount: 40,
    //   },
    // });

    // this.shoppingForm.patchValue({
    //   ingredients: {
    //     amount: 150,
    //   },
    // });
  }

  onSubmit() {
    // console.log(this.shoppingForm.get('ingredients.name')?.valid);
    // this.shoppingListService.addIngredient(this.form.value as Ingredient);
    // form.reset();
    this.shoppingListService.addIngredient(
      this.shoppingForm.get('ingredients')?.value
    );
    this.shoppingForm.reset({
      ingredients: {
        amount: 0,
      },
    });
  }

  onClearShoopingList() {
    this.shoppingListService.clearShoppinList();
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
