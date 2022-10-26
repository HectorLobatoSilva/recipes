import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DropdownOption } from 'src/app/models/dropdow-option.model';
import { Recipe } from 'src/app/models/recipe.model';
import { StoreActionsType } from 'src/app/reducers/actions-type';
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
    private recipeService: RecipeService,
    private store: Store<StoreActionsType['recipe']>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.store
        .select('recipes')
        .subscribe(({ recipes }: StoreActionsType['recipe']['recipes']) => {
          const index = recipes.findIndex(
            (recipe: Recipe) => recipe.id === this.id
          );
          this.recipe = recipes[index];
        });
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
