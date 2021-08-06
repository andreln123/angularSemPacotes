import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe-list/recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  /* selectedRecipe: Recipe;
  private recipeSub: Subscription; */

  /* constructor(private recipeService: RecipeService) { 
    this.selectedRecipe = new Recipe('','','',[new Ingredient('', 1)]);
    this.recipeSub = new Subscription();
  } */
  constructor() { }

  ngOnInit(): void {
    /* this.recipeSub = this.recipeService.recipeSelected
      .subscribe(
        (recipe: Recipe) => {
          this.selectedRecipe = recipe;
        }  
      ) */
  }

  /* ngOnDestroy() {
    this.recipeSub.unsubscribe();
  } */
}
