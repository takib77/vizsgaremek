import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';
registerLocaleData(localeHu);

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { HomeComponent } from './page/home/home.component';
import { SortPipe } from './pipe/sort.pipe';
import { SearchPipe } from './pipe/search.pipe';
import { UserComponent } from './page/user/user.component';
import { ProductComponent } from './page/product/product.component';
import { OrderComponent } from './page/order/order.component';
import { AnimalComponent } from './page/animal/animal.component';
import { LoginComponent } from './page/login/login.component';
import { XPipePipe } from './pipe/x-pipe.pipe';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import { ProductEditorComponent } from './page/product-editor/product-editor.component';
import { OrderEditorComponent } from './page/order-editor/order-editor.component';
import { AnimalEditorComponent } from './page/animal-editor/animal-editor.component';
import { AnimalCardComponent } from './page/animal-card/animal-card.component';
import { FoodCardComponent } from './page/food-card/food-card.component';
import { EquipmentCardComponent } from './page/equipment-card/equipment-card.component';
import { ProfileComponent } from './page/profile/profile.component';
import { JwtinterceptorService } from './service/jwt-interceptor.service';
import { UserRolePipe } from './pipe/user-role.pipe';
import { BooleanSignPipe } from './pipe/boolean-sign.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent,
    DataTableComponent,
    HomeComponent,
    SortPipe,
    SearchPipe,
    UserComponent,
    ProductComponent,
    OrderComponent,
    AnimalComponent,
    LoginComponent,
    XPipePipe,
    ForbiddenComponent,
    UserEditorComponent,
    ProductEditorComponent,
    OrderEditorComponent,
    AnimalEditorComponent,
    AnimalCardComponent,
    FoodCardComponent,
    EquipmentCardComponent,
    ProfileComponent,
    UserRolePipe,
    BooleanSignPipe,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'hu-HU' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtinterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
