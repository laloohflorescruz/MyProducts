import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ProductModule } from './products/product.module';
import { MessageModule } from './messages/message.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from 'src/product-data';
import { AppRoutingModule } from './app-routing.module';
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
    ProductModule,
    UserModule,
    MessageModule, 
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
