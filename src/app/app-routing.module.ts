import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./modules/recipe.module').then((mod) => mod.RecipeModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./modules/shopping.module').then((mod) => mod.ShoppingModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/error.module').then((mod) => mod.ErrorModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
