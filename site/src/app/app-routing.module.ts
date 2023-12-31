import { NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';

const routes: Routes = [ 
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
     
  exports: [RouterModule]
})
export class AppRoutingModule { }
