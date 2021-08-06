import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild   } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  /* @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef; */
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f') private slForm!: NgForm; 
  private subscription!: Subscription;
  private editMode = false;
  private editedItemIndex!: number;
  private editedItem!: Ingredient;

  public constructor(nameInputRef: ElementRef, amountInputRef: ElementRef, private slService: ShoppingListService) { 
    /* this.nameInputRef = nameInputRef;
    this.amountInputRef = amountInputRef; */
    /* this.subscription = new Subscription(); */
    /* this.editedItemIndex = 0; */
    /* this.editedItem = new Ingredient('', 0); */
  }

  public getEditMode(): boolean {
    return this.editMode;
  }

  ngOnInit(): void {
    this.subscription = this.slService.getStartedEditing()
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(this.editedItemIndex);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  /* onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);

    // this.ingredientAdded.emit(newIngredient);

    this.shoppingListService.addIngredient(newIngredient);
  } */
  
  public onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode)
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    else
      this.slService.addIngredient(newIngredient);

    this.slForm.reset();
    this.editMode = false;
  }

  public onClear(): void {
    /* this.slService.clearIngredients(); */
    this.slForm.reset();
    this.editMode = false;
  }

  public onDelete(): void {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
