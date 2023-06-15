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

@NgModule({
  declarations: [	
    AppComponent,
    WelcomeComponent,
    MessagesComponent,
    ProductsComponent,
    UserComponent,
    PageNotFoundComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,    
    //HttpClientModule,
    //InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: 'products', component: ProductsComponent},

      {path: '**', component: PageNotFoundComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
