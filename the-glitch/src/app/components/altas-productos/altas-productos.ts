import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './altas-productos.html',
  styleUrl: './altas-productos.css',
  imports: [ReactiveFormsModule, CommonModule]
})
export class AltaProductoComponent {
  productoForm: FormGroup;
  mensajeEstado = signal('');

  // Creacipon del Form
  constructor(private fb: FormBuilder, private pService: ProductService) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      marca: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      imagen: ['', Validators.required],
      descripcion: ['', Validators.required],
      disponible: [true]
    });
  }

  // Subir archivo local para el campo imagen del form
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.productoForm.patchValue({ imagen: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  // Conectar con la función en ProductoService
  enviar() {
    if (this.productoForm.valid) {
      this.pService.addProduct(this.productoForm.value).subscribe({
        next: () => {
          this.mensajeEstado.set('¡Producto guardado con éxito!'); 
          this.productoForm.reset({ disponible: true });
        },
        error: () => this.mensajeEstado.set('Error al guardar')
      });
    }
  }

}
