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
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getById(Number(params['id']));
      if (this.recipe) {
        this.ingredients = this.recipe.ingredients;
        setTimeout(() => {
          this.form.form.patchValue(this.recipe, { onlySelf: true });
          this.submitText = 'Update';
          this.isEditForm = true;
        });
      }
    });
  }

  onAddIngredient(name: HTMLInputElement, amount: HTMLInputElement) {
    if (name.value && amount.value) {
      const id = this.ingredients.length + 1;
      this.ingredients.push(
        new Ingredient(id, name.value, Number(amount.value))
      );
      name.value = '';
      amount.value = '0';
    }
    name.focus();
  }

  onSubmit() {
    if (this.isEditForm) {
      this.updateRecipe(this.form.value);
    } else {
      this.addRecipe(this.form.value);
    }
    this.ingredients = [];
    this.form.reset();
  }

  onDeleteIngrient(id: number) {
    this.ingredients.splice(id, 1);
  }

  addRecipe(form: any) {
    const { name, description, imagePath } = form;
    const recipe: Recipe = new Recipe(
      this.recipeService.generateID(),
      name,
      description,
      imagePath,
      this.ingredients
    );
    this.recipeService.addNewRecipe(recipe);
  }

  updateRecipe(form: any) {
    const { name, description, imagePath } = form;
    this.recipe = { ...this.recipe, name, description, imagePath };
    this.recipeService.updateRecipe(this.recipe);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
