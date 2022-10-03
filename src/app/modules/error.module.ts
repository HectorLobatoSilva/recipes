import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ErrorPageComponent } from '../components/error-page/error-page.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ErrorPageComponent,
      },
    ]),
  ],
  exports: [],
})
export class ErrorModule {}
