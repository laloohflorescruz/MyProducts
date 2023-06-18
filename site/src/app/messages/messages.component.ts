import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from './messageService.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  get messages() {
    return this.msgService.messages;
  }
  
  constructor(private msgService: MessageService,
    private router: Router) { }

  close(): void {
    // Close the popup.
  }
}
