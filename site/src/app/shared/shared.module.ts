import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SharedComponent
  ],
  exports: [
    SharedComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
