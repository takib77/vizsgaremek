import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressComponent } from './page/address/address.component';
import { AnimalCardComponent } from './page/animal-card/animal-card.component';
import { AnimalEditorComponent } from './page/animal-editor/animal-editor.component';
import { AnimalComponent } from './page/animal/animal.component';
import { EquipmentCardComponent } from './page/equipment-card/equipment-card.component';
import { FoodCardComponent } from './page/food-card/food-card.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { OrderEditorComponent } from './page/order-editor/order-editor.component';
import { OrderComponent } from './page/order/order.component';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { ProductComponent } from './page/product/product.component';
import { ProfileComponent } from './page/profile/profile.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { UserComponent } from './page/user/user.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';

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
    path: 'address',
    component: AddressComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 2 }
  },
  {
    path: 'animals',
    component: AnimalComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 2 }
  },
  {
    path: 'animals/edit/:id',
    component: AnimalEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 2 }
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 1 }

  },
  {
    path: 'orders',
    component: OrderComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 2 }
  },
  {
    path: 'orders/edit/:id',
    component: OrderEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 2 }
  },
  {
    path: 'products',
    component: ProductComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 2 }
  },
  {
    path: 'products/edit/:id',
    component: ProductEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 2 }
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 3 }
  },
  {
    path: 'users/edit/:id',
    component: UserEditorComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: { expectedRole: 3 }
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
