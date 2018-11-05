import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
  // Add an emittter here to inform ing array copy on our service file that data has changed.
  // Bcos the getIng() method only returns a copy of the array NOT the original array.
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];


  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];

  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // this is a viable option below, but not favored bcos it emits a lot of events as a result of the for Loop.
    // for (const ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    // bellow we have to "emit" that our ings changed, and so we pass a copy of it along.
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());

  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
