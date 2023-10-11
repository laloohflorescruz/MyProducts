import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  errorMessage: string | undefined;
  pageTitle = 'Log In';

  constructor(private authService: AuthServiceService,
    private router: Router) { }
  
  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      const userName = loginForm.form.value.userName;
      const passWord = loginForm.form.value.passWord;
      this.authService.login(userName, passWord);
      
      if(this.authService.redirectUrl){
        this.router.navigateByUrl(this.authService.redirectUrl)
      } else {
        this.router.navigate(['/products']);
      }
    }
    else {
      this.errorMessage = 'Please enter an username and password.';
    }
  } 
}
