import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { ProductFormReactive } from '../../components/product-form-reactive/product-form-reactive';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert-service';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CommonModule, ProductFormReactive],
  templateUrl: './product-admin.html',
  styleUrl: './product-admin.css',
})
export class ProductAdmin implements OnInit {
  products!: Observable<any[]>;
  showForm = false;
  editingProduct: any = null;

  private cdr = inject(ChangeDetectorRef);
  private productService = inject(ProductService);
  private alertService = inject(AlertService);

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  prepareAdd() {
    this.editingProduct = null;
    this.showForm = true;
  }

  prepareEdit(product: any) {
    this.editingProduct = product;
    this.showForm = true;
  }

  async deleteProduct(id: number) {
    const confirmed = await this.alertService.confirm(
      '¿Estás seguro?',
      'Este producto se eliminará permanentemente.',
    );

    if (confirmed) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.alertService.toast('Producto eliminado correctamente', 'error');
          this.loadProducts();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.alertService.error('No se pudo eliminar el producto', 'Error de servidor');
        },
      });
    }
  }

  handleSave(formData: FormData) {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, formData).subscribe({
        next: () => {
          this.alertService.toast('Producto actualizado correctamente', 'success');
          this.resetView();
          this.cdr.detectChanges();
        },
        error: () => this.alertService.error('No se pudo actualizar el producto'),
      });
    } else {
      this.productService.addProduct(formData).subscribe({
        next: () => {
          this.alertService.success('El producto ha sido guardado correctamente');
          this.resetView();
          this.cdr.detectChanges();
        },
        error: () => this.alertService.error('Hubo un error al crear el producto'),
      });
    }
  }

  private resetView() {
    this.showForm = false;
    this.editingProduct = null;
    this.loadProducts();
  }
}
