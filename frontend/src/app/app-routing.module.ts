import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalComponent } from './page/animal/animal.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { OrderComponent } from './page/order/order.component';
import { ProductComponent } from './page/product/product.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'animals',
    component: AnimalComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'user/:id',
    component: UserEditorComponent
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
