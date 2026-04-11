import { Component, OnInit, ChangeDetectorRef, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../services/cart-service';
import { AlertService } from '../../services/alert-service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})

export class Catalog implements OnInit {
  private cartService = inject(CartService);
  private alertService = inject(AlertService);

  products = signal<any[]>([]);
  activeCategory = signal<string>('All');

  categories = computed(() => {
    const allCategories = this.products().map((p) => p.category);
    return ['All', ...new Set(allCategories)];
  });

  filteredProducts = computed(() => {
    const filter = this.activeCategory();
    if (filter === 'All') {
      return this.products();
    }
    return this.products().filter((p) => p.category === filter);
  });

  constructor(
    private ProductService: ProductService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ProductService.getProducts().subscribe((data) => {
      this.products.set(data);
      this.cd.detectChanges();
    });
  }

  setCategory(category: string): void {
    this.activeCategory.set(category);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);

    this.alertService.toast(`¡${product.name} añadido al carrito!`, 'success');
  }

  isMaxStockReached(product: any): boolean {
    const itemsInCart = this.cartService.items();
    const productInCart = itemsInCart.find((item) => item.id === product.id);

    if (!productInCart) return false;

    return productInCart.quantity >= product.stock;
  }
}
