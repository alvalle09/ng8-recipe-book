import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static: true}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInputRef: ElementRef;

  ingredientAdded = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {

  }
}
