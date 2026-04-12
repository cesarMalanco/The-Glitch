import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css',
})
export class CategoryFilter {
  @Input() categories: string[] = [];
  @Input() activeCategory: string = 'All';
  @Input() totalProducts: number = 0;

  @Output() onCategoryChange = new EventEmitter<string>();
}
