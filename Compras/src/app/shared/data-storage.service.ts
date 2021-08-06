import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe-list/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  public storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.http.put('http://localhost:8080/Rest/receitas/atualizar', recipes[0]).
    subscribe(response => {
      console.log(response);
    });
  }

  public fetchRecipes() {
    return this.http.get<Recipe[]>('http://localhost:8080/Rest/receitas/listar').
    pipe(map(recipes => {
      return recipes.map(recipes => {
        return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients : []}
      })
    }), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }
  
  /* public fetchRecipes(): void {
    this.http.get<Recipe[]>('http://localhost:8080/Rest/receitas/listar').
    subscribe(recipes => {
      this.recipeService.setRecipes(recipes);
    });
  } */
}
