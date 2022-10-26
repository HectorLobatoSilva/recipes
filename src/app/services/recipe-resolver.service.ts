import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { StoreActionsType } from '../reducers/actions-type';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Array<Recipe>> {
  constructor(
    private recipeService: RecipeService,
    private store: Store<StoreActionsType['recipe']['recipes']>
  ) {}

  resolve(): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    let recipes: Recipe[] = [];
    this.store
      .select('recipes')
      .subscribe((rep: any) => (recipes = rep.recipes));
    if (recipes.length === 0) {
      return this.recipeService.fetchRecipes();
    }
    return recipes;
  }
}
