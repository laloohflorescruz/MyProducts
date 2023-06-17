import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { ProductsComponent } from './products/products.component';
import { UserComponent } from './user/user.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { UserModule } from './user/user.module';
import { ProductListComponent } from './products/productList/productList.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductModule } from './products/product.module';
import { MessageModule } from './messages/message.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from 'src/product-data';
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { ProductData } from './products/product-data';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'products', component: ProductListComponent },
      { path: '**', component: PageNotFoundComponent }
    ]),
    ProductModule,
    UserModule,
    MessageModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
