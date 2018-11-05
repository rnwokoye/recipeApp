import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  // store the 'params in our id ppty
  id: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // we need to get the recipe ID from our route params information:
    this.route.params
    .subscribe(
      (params: Params) => {
        // since we know the id will be a string, we cast it to a number by adding the + sign.
        this.id = +params['id'];
        // now fetch the recipe by id from the recipe service:
        this.recipe = this.recipeService.getRecipe(this.id);

    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);

  }
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});

  // alt more complex navigating is:
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});

  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
