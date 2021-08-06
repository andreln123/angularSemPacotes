import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipes/recipe-list/recipe.model';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  public resolve(route: ActivatedRouteSnapshot ,state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0)
      return this.dataStorageService.fetchRecipes();
    
    return recipes;
  }
}
