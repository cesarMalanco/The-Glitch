import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart-service';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  cartService = inject(CartService);

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  categories: string[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.categories = ['Todos', ...new Set(data.map((p: any) => p.category))];
    });
  }
}