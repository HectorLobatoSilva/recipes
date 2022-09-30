import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from '../components/shopping/shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from '../components/shopping/shopping-list/shopping-list.component';
import { ShoppingComponent } from '../components/shopping/shopping.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    ShoppingEditComponent,
    ShoppingComponent,
    ShoppingListComponent,
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingComponent,
      },
    ]),
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [ShoppingListComponent],
})
export class ShoppingModule {}
