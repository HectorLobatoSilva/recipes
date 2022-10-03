import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmountPipe } from '../amount.pipe';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { LoaderComponent } from '../components/loader/loader.component';

import { DropdownDirective } from '../directives/dropdown-menu.directive';

const components = [
  AmountPipe,
  DropdownComponent,
  DropdownDirective,
  LoaderComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: [...components, CommonModule],
})
export class SharedModule {}
