import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe-list/recipe.model';
/* import { Subject, Subscription } from 'rxjs'; */

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  /* private recipeSelected = new EventEmitter<Recipe>(); */
  /* recipeSelected = new EventEmitter<Recipe>(); */
  /* recipeSelected = new Subject<Recipe>(); */
  /* private recipe: Recipe; */
  
  /* constructor() { this.recipe = new Recipe('','','') } */
  constructor(private shoppingListService: ShoppingListService) { }
  
  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simply a test', 'https://img.itdg.com.br/tdg/images/blog/uploads/2020/04/receitas-com-3-ingredientes.jpg', 
              [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
    new Recipe('Other test recipe', 'Other This is simply a test', 'https://p2.trrsf.com/image/fget/cf/460/0/images.terra.com/2021/05/03/1881630605-escondidinho-de-frigideira.jpg', 
              [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  /* public getRecipesChanged(): Subject<Recipe[]> {
    return this.recipesChanged;
  } */

  /* emitirEvento(recipe: Recipe) { */
    /* this.recipeSelected.emit(recipe); */
    /* this.recipeSelected.next(recipe); */
  /* } */

  addIngredientsToShoppingLista(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientsToShoppingLista(ingredients);
  }

  public addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  public updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  public deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
