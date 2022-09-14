import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-new',
  templateUrl: './recipe-new.component.html',
})
export class RecipeNewComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;
  submitText: string = 'Add';
  isEditForm: boolean = false;
  ingredients: Array<Ingredient> = [];

  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.id = params['id'];
        this.initValues(this.recipeService.getRecipeByID(this.id));
      }
    });
  }

  initValues(recipe: Recipe) {
    this.ingredients = recipe.ingredients || [];
    setTimeout(() => {
      this.form.form.patchValue(recipe, { onlySelf: true });
      this.submitText = 'Update';
      this.isEditForm = true;
    });
  }

  onAddIngredient(name: HTMLInputElement, amount: HTMLInputElement) {
    if (name.value && amount.value) {
      this.ingredients.push(new Ingredient(name.value, Number(amount.value)));
      name.value = '';
      amount.value = '0';
    }
    name.focus();
  }

  onSubmit() {
    const { name, description, imagePath } = this.form.value;
    const recipe = new Recipe(
      name,
      description,
      imagePath,
      this.ingredients,
      this.id
    );
    if (this.isEditForm) {
      this.recipeService.updateRecipe(recipe);
    } else {
      this.recipeService.addNewRecipe(recipe);
    }
    this.ingredients = [];
    this.form.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngrient(id: number) {
    this.ingredients.splice(id, 1);
  }
}
