import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RecipeDetailComponent } from '../components/recipes/recipe-detail/recipe-detail.component';
import { RecipeNewComponent } from '../components/recipes/recipe-new/recipe-new.component';
import { RecipeItemComponent } from '../components/recipes/recipes-list/recipe-item/recipe-item.component';
import { RecipesListComponent } from '../components/recipes/recipes-list/recipes-list.component';
import { RecipesComponent } from '../components/recipes/recipes.component';

import { RecipeRoutingModule } from './recipe-routing.module';
import { SharedModule } from './shared.module';
import { ShoppingModule } from './shopping.module';

const components = [
  RecipesComponent,
  RecipesListComponent,
  RecipeItemComponent,
  RecipeDetailComponent,
  RecipeNewComponent,
];

@NgModule({
  declarations: components,
  imports: [
    RouterModule,
    FormsModule,
    RecipeRoutingModule,
    SharedModule,
    ShoppingModule,
  ],
})
export class RecipeModule {}
