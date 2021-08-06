import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  /* ingredientsChange = new EventEmitter<Ingredient[]>(); */
  ingredientsChange = new Subject<Ingredient[]>();
  private startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10)
  ];

  constructor() { }

  public getStartedEditing(): Subject<number> {
    return this.startedEditing;
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  public getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    /* this.ingredientsChange.emit(this.getIngredients()); */
    this.ingredientsChange.next(this.getIngredients());
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChange.next(this.getIngredients().slice());
  }
  
  clearIngredients() {
    this.ingredients = [];
    /* this.ingredientsChange.emit(this.getIngredients()); */
    this.ingredientsChange.next(this.getIngredients());
  }

  public deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1); //Remove um elemento a partir do índice "index".
    this.ingredientsChange.next(this.getIngredients().slice());
  }

  addIngredientsToShoppingLista(ingredients: Ingredient[]) {
      this.ingredients.push(...ingredients);
      /* this.ingredientsChange.emit(this.getIngredients()); */
      this.ingredientsChange.next(this.getIngredients());
  }
}
