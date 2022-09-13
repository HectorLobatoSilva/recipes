import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RecipeItemComponent } from './components/recipes/recipes-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping/shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { DropdownDirective } from './directives/dropdown-menu.directive';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { RecipeNewComponent } from './components/recipes/recipe-new/recipe-new.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { AmountPipe } from './amount.pipe';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterseptorService } from './services/auth-interseptor.service';
import { LogginInterseptorService } from './services/loggin-interseptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ErrorPageComponent,
    RecipeDetailComponent,
    DropdownDirective,
    DropdownComponent,
    RecipeNewComponent,
    ShoppingComponent,

    AmountPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterseptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogginInterseptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
