import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();



  private recipes: Recipe[] = [
    new Recipe(
      'Kings Burger',
      'Juicy steam grilled burgers -amazinginly filling',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbpMa-Zg8iMgzD7uPwUmRHuDwWN5s4BVAfhyysuNs4z2D2zBy8oQ',
    [
      new Ingredient('Meat', 1),
      new Ingredient('Buns', 2),
      new Ingredient('Lettuce', 2),
      new Ingredient('Tomatoes', 1),
    ]),

    new Recipe(
      'Fried Chicken',
      'Super Tender Fillet of Chicken served with vegies',
      'https://www.foodnetwork.com/content/dam/images/food/video/0/01/012/0125/0125629.jpg',
    [
      new Ingredient('Chicken', 1),
      new Ingredient('Tomatoes', 2),
      new Ingredient('Cabbage', 1),
      new Ingredient('Cucumber', 1),
    ])
  ];

  constructor(private shoppingListService: ShoppingListService, private http: Http) {}


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());

  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // this get method returns a single recipe by id from the recipe detail component.
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

