import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DropdownOption } from 'src/app/models/dropdow-option.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe('', '', '', []);
  dropdownOptions: Array<DropdownOption> = [
    new DropdownOption('Send to shopping list', () =>
      this.onSendToShoppingList()
    ),
    new DropdownOption('Edit Recipe', () => this.onEditRecipe()),
    new DropdownOption('Delete Recipe', () => this.onDeleteRecipe()),
  ];

  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.recipeService.getRecipeByID(this.id)) {
        this.recipe = this.recipeService.getRecipeByID(this.id);
      } else {
        this.recipeService
          .fetchByID(params['id'])
          .subscribe((recipe: Recipe) => {
            if (!recipe)
              this.router.navigate(['../'], { relativeTo: this.route });
            this.recipe = recipe;
          });
      }
    });
  }

  onSendToShoppingList() {
    this.recipeService.addIngredientsToShoopingList(this.recipe.ingredients);
    this.router.navigate(['./../../shopping-list'], { relativeTo: this.route });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
