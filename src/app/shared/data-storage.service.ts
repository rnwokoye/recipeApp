import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {

  constructor(private recipeService: RecipeService, private http: Http, private authService: AuthService) {}


  storeRecipe() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipebook-9b575.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());

  }

  // fetchRecipe() {
  //   return this.http.get('https://ng-recipebook-9b575.firebaseio.com/recipes.json')
  //   .pipe(map(
  //     (response: Response) => {
  //       const data = response.json();
  //       return data;
  //     }
  //   ));
  // }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get('https://ng-recipebook-9b575.firebaseio.com/recipes.json?auth=' + token)
    .pipe(map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            console.log(recipe);
            recipe['ingredinets'] = [];
          }
        }
        return recipes;
      }
    ))

    .subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      }
    );

  }

}
