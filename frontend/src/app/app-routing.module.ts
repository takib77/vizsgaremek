import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnimalCardComponent } from './page/animal-card/animal-card.component';
import { AnimalEditorComponent } from './page/animal-editor/animal-editor.component';
import { AnimalComponent } from './page/animal/animal.component';
import { EquipmentCardComponent } from './page/equipment-card/equipment-card.component';
import { FoodCardComponent } from './page/food-card/food-card.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { OrderEditorComponent } from './page/order-editor/order-editor.component';
import { OrderComponent } from './page/order/order.component';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { ProductComponent } from './page/product/product.component';
import { ProfileComponent } from './page/profile/profile.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { UserComponent } from './page/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'animal-cards',
    component: AnimalCardComponent
  },
  {
    path: 'equipment-cards',
    component: EquipmentCardComponent
  },
  {
    path: 'food-cards',
    component: FoodCardComponent
  },
  {
    path: 'animals',
    component: AnimalComponent
  },
  {
    path: 'animal/:id',
    component: AnimalEditorComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'order/:id',
    component: OrderEditorComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'product/:id',
    component: ProductEditorComponent
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
