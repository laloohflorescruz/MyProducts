import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { MessageService } from '../pageNotFound/messages/messageService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  currentUser: User | undefined;
  redirectUrl: string | undefined;


  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  constructor(private msgSerivce: MessageService) { }

  login(userName: string, password: string): void {
    if (!userName || !password) {
      this.msgSerivce.addMessage('Please enter your username and password');
      return;
    }

    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true
      };
      this.msgSerivce.addMessage('Admin login');
      return;
    }
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
    this.msgSerivce.addMessage(`User: ${this.currentUser.userName} logged in`);
  }

  logOut(): void {
    this.currentUser = undefined;
  }

}
