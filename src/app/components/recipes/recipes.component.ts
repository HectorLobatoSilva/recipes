import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit {
  error: string = '';
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipeError.subscribe((error: string) => {
      this.error = error;
    });
  }

  OnRemoveError() {
    this.error = '';
  }
}
