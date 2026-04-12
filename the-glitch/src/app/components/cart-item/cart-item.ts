import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  @Input() p: any;

  @Output() onRemove = new EventEmitter<number>();
  @Output() onAdd = new EventEmitter<any>();
  @Output() onDeleteAll = new EventEmitter<number>();
}
