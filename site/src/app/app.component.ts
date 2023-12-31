import { Component } from '@angular/core';
import { AuthServiceService } from './services/authService.service';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { slideInAnimation } from './app.animation';
import { MessageService } from './pageNotFound/messages/messageService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]

})
export class AppComponent {
  pageTitle = 'Product Manager';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }


  constructor(
    private authService: AuthServiceService,
    private router: Router, 
    private messageService: MessageService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  displayMessages() : void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
    }

    
    hideMessages(): void {
      this.router.navigate([{ outlets: { popup: null } }]);
      this.messageService.isDisplayed = false;
    }
  

  logOut(): void {
    this.authService.logOut();
    this.router.navigateByUrl('/welcome');
  }
}
