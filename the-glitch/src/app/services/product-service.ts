import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  private apiUrl = 'http://localhost:3000/api/catalog';
  private addApiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Observable to add a product
  addProduct(producto: any): Observable<any> {
    return this.http.post(this.addApiUrl, producto);
  }
}
