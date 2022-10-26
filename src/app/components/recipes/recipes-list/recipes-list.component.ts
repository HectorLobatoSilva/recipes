import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { StoreActionsType } from 'src/app/reducers/actions-type';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
})
export class RecipesListComponent implements OnInit {
  recipes: Observable<{ recipes: Recipe[] }>;
  isLoading = true;
  constructor(
    private recipeService: RecipeService,
    private store: Store<StoreActionsType['recipe']>
  ) {}

  ngOnInit(): void {
    this.recipes = this.store.select('recipes');
    // this.recipes = this.recipeService.getRecipes();
    // this.subscription = this.recipeService.recipesChanged.subscribe(
    //   (recipes: Array<Recipe>) => {
    //     this.recipes = recipes;
    //     this.isLoading = false;
    //   }
    // );
  }
}
