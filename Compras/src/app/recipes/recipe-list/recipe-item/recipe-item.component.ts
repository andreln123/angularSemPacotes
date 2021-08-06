import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number;
  /* @Output() recipeSelected = new EventEmitter<void>(); */

  constructor(private recipeService: RecipeService) { 
    this.recipe = new Recipe('', '', '',[new Ingredient('', 1)]);
    this.index = 0;
  }

  ngOnInit(): void {
  }

  /* onSelected() {
    this.recipeService.emitirEvento(this.recipe);
  } */

}
