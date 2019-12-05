import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 20),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Lettuce', 10)
  ];

  constructor() { }

  ngOnInit() {
  }

}
