import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  /* @Output() recipeWasSelected = new EventEmitter<Recipe>(); */
  recipes!: Recipe[];/*  = [
    new Recipe('A test recipe', 'This is simply a test', 'https://img.itdg.com.br/tdg/images/blog/uploads/2020/04/receitas-com-3-ingredientes.jpg'),
    new Recipe('Other test recipe', 'Other This is simply a test', 'https://p2.trrsf.com/image/fget/cf/460/0/images.terra.com/2021/05/03/1881630605-escondidinho-de-frigideira.jpg')
  ]; */
  private subscription!: Subscription;

  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );

    this.recipes = this.recipeService.getRecipes();
  }

  public onNewRecipe(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  /* onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  } */

  public ngOnDestroy(): void { //Devemos cancelar a inscrição quando o componente for destruído
    this.subscription.unsubscribe();
  }
}
