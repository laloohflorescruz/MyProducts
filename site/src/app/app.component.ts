import { Component } from '@angular/core';
import { AuthServiceService } from './services/authService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Product Manager';
  
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthServiceService) { }

  logOut(): void {
    this.authService.logOut();
    console.log('Log out');
  }
}
