import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalsComponent } from './page/animals/animals.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { OrdersComponent } from './page/orders/orders.component';
import { ProductsComponent } from './page/products/products.component';
import { UsersComponent } from './page/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'animals',
    component: AnimalsComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'orders',
    component: OrdersComponent
  },

  {
    path: 'products',
    component: ProductsComponent
  },

  {
    path: 'users',
    component: UsersComponent
  },

  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
