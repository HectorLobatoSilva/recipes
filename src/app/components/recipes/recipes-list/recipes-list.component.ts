import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipes: Array<Recipe> = [];
  private subscription: Subscription;
  constructor(
    private recipeService: RecipeService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit(): void {
    this.dataStorage.fetchRecipes().subscribe();
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Array<Recipe>) => (this.recipes = recipes)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
