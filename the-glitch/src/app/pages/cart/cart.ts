import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../components/cart-item/cart-item';
import { OrderSummary } from '../../components/order-summary/order-summary';
import { CartService } from '../../services/cart-service';
import { AlertService } from '../../services/alert-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, CartItem, OrderSummary],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})

export class Cart {
  private cartService = inject(CartService);
  private alertService = inject(AlertService);

  public items = this.cartService.items;
  public total = this.cartService.totalPrice;

  remove(id: number) {
    this.cartService.removeFromCart(id);
  }

  addOne(product: any) {
    this.cartService.addToCart(product);
  }

  async removeAll(id: number) {
    const confirmed = await this.alertService.confirm(
      '¿Estás seguro?',
      'Se eliminarán todas las unidades de este producto.',
    );

    if (confirmed) {
      this.cartService.clearItem(id);
      this.alertService.toast('Producto(s) eliminado(s)', 'error');
    }
  }
}
