import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeHu from '@angular/common/locales/hu';

registerLocaleData(localeHu);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { HomeComponent } from './page/home/home.component';
import { SortPipe } from './pipe/sort.pipe';
import { SearchPipe } from './pipe/search.pipe';
import { UsersComponent } from './page/users/users.component';
import { ProductsComponent } from './page/products/products.component';
import { OrdersComponent } from './page/orders/orders.component';
import { AnimalsComponent } from './page/animals/animals.component';
import { LoginComponent } from './page/login/login.component';
import { XPipePipe } from './pipe/x-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent,
    DataTableComponent,
    HomeComponent,
    SortPipe,
    SearchPipe,
    UsersComponent,
    ProductsComponent,
    OrdersComponent,
    AnimalsComponent,
    LoginComponent,
    XPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'hu-HU' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
