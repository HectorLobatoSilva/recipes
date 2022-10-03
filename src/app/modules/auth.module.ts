import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
      },
    ]),
    FormsModule,
    RouterModule,
    SharedModule,
  ],
})
export class AuthModule {}
