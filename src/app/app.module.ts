import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './components/error-page/error-page.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { SharedModule } from './modules/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './reducers/shopping-list.reducer';
import { recipesReducer } from './reducers/recipes.reducer';

@NgModule({
  declarations: [HeaderComponent, AppComponent, ErrorPageComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(
      {
        shoppingList: shoppingListReducer,
        recipes: recipesReducer,
      },
      {}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
