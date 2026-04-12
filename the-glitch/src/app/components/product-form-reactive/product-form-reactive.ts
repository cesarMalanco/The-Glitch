import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form-reactive',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form-reactive.html',
  styleUrl: './product-form-reactive.css',
})
export class ProductFormReactive {
  @Output() onSave = new EventEmitter<FormData>();

  @Input() set initialData(value: any) {
    if (value) {
      this.form.patchValue(value);
      this.imagePreview = value.image_url
        ? `http://localhost:3000/uploads/${value.image_url}`
        : null;
    } else {
      this.form.reset({ price: 0, stock: 0 });
      this.imagePreview = null;
    }
  }

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(1)]),
    category: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData();
      Object.entries(this.form.value).forEach(([key, value]) => {
        formData.append(key, value?.toString() || '');
      });
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }
      this.onSave.emit(formData);
    }
  }
}
