import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit {
  error: string = '';
  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    console.warn('TODO RecipesComponent [ERROR Handling]');
    // this.recipeService.recipeError.subscribe((error: string) => {
    //   this.error = error;
    // });
  }

  OnRemoveError() {
    this.error = '';
  }
}
