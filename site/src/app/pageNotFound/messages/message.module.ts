import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MessagesComponent } from './messages.component';
import { RouterModule } from '@angular/router';
 
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ' messages',
        component: MessagesComponent,
        outlet: 'popup'
      }
    ])
  ],
  declarations: [ 
    MessagesComponent
  ]
})
export class MessageModule { }
