import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private cartItems = signal<any[]>([]);

  public countItems = computed(() => {
    return this.cartItems().reduce((acc, p) => acc + (p.quantity || 1), 0);
  });

  items = this.cartItems.asReadonly();

  totalPrice = computed(() =>
    this.cartItems().reduce((acc, p) => acc + Number(p.price) * (p.quantity || 1), 0),
  );

  addToCart(product: any) {
    this.cartItems.update((prev) => {
      const existingProduct = prev.find((p) => p.id === product.id);
      const currentQuantity = existingProduct ? existingProduct.quantity : 0;

      if (currentQuantity >= product.stock) {
        console.warn(`Stock agotado para ${product.name}`);
        return prev;
      }

      if (existingProduct) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p,
        );
      } else {
        return [...prev, { ...product, quantity: 1, price: Number(product.price) }];
      }
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update((prev) => {
      const existingProduct = prev.find((p) => p.id === productId);

      if (existingProduct && existingProduct.quantity > 1) {
        return prev.map((p) => (p.id === productId ? { ...p, quantity: p.quantity - 1 } : p));
      } else {
        return prev.filter((p) => p.id !== productId);
      }
    });
  }

  clearItem(productId: number) {
    this.cartItems.update((prev) => prev.filter((p) => p.id !== productId));
  }
}
