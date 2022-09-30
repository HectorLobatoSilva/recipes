import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeDetailComponent } from '../components/recipes/recipe-detail/recipe-detail.component';
import { RecipeNewComponent } from '../components/recipes/recipe-new/recipe-new.component';
import { RecipesComponent } from '../components/recipes/recipes.component';
import { RecipeResolverService } from '../services/recipe-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    resolve: [RecipeResolverService],
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new',
        component: RecipeNewComponent,
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeNewComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
