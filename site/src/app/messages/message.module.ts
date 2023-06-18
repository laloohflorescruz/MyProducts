import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MessagesComponent } from './messages.component';
 
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ 
    MessagesComponent
  ]
})
export class MessageModule { }
