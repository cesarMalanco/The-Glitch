import { Routes } from '@angular/router';
import { Cart } from './pages/cart/cart';
import { Catalog } from './pages/catalog/catalog';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { ProductDetail } from './pages/product-detail/product-detail';
import { ProductForm } from './pages/product-form/product-form';
import { AltaProductoComponent } from './components/altas-productos/altas-productos';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'catalog',
    component: Catalog,
  },
  {
    path: 'catalog/add',
    component: ProductForm,
  },
  {
    path: 'catalog/:id',
    component: ProductDetail,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: 'products/add', 
    component: AltaProductoComponent
  },
];
