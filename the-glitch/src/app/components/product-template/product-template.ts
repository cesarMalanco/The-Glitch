import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-template',
  imports: [FormsModule],
  templateUrl: './product-template.html',
  styleUrl: './product-template.css',
})
export class ProductTemplate {
  @Output() saveProduct = new EventEmitter<any>();

  product = {
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    image: '',
    description: '',
    available: ''
  };

  submitForm(){
    this.saveProduct.emit({...this.product})
    this.product = {
      name: '',
      category: '',
      brand: '',
      price: '',
      stock: '',
      image: '',
      description: '',
      available: ''
    }
  }
}
