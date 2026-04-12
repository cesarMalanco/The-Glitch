import { Routes } from '@angular/router';
import { Cart } from './pages/cart/cart';
import { Catalog } from './pages/catalog/catalog';
import { Contact } from './pages/contact/contact';
import { Home } from './pages/home/home';
import { ProductDetail } from './pages/product-detail/product-detail';
import { ProductAdmin } from './pages/product-admin/product-admin';

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
    path: 'catalog/:id',
    component: ProductDetail,
  },
  {
    path: 'admin',
    component: ProductAdmin,
  },
  {
    path: 'cart',
    component: Cart,
  },
  {
    path: 'contact',
    component: Contact,
  },
];
