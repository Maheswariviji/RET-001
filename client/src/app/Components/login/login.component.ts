import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAuthService } from '../../services/login-auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup;
previousUrl;

  constructor(private formBuilder: FormBuilder,public router: Router,
          private authService: LoginAuthService,public toastr: ToastsManager,
          public vcr: ViewContainerRef,private authGuard: AuthGuard) 
  {
    this.createForm();
    this.toastr.setRootViewContainerRef(vcr);
   }

  createForm() {
    this.loginform = this.formBuilder.group({
     email: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(30), 
        this.validateEmail 
      ])],
     
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(35), 
        this.validatePassword 
      ])],
     
     
    }); 
  }

  validatePassword(controls) {
    
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
   
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 
       'validatePassword': true
        } 
    }
  }
validateEmail(controls) {
   
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
   
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }
 
  disableForm() {
   this.loginform.controls['email'].disable(); 
   this.loginform.controls['password'].disable(); }
 
  enableForm() {
   this.loginform.controls['email'].enable();
    this.loginform.controls['password'].enable(); 
  }

onLogin()
{

    const user = {
      email: this.loginform.get('email').value, 
      password: this.loginform.get('password').value
    }
    this.authService.login(user).subscribe(data => {
        
        if (!data.success) {
            this.toastr.error(data.message, 'Oops!');
        } else {
            this.toastr.success(data.message, 'Success!');
          this.authService.storeUserData(data.token, data.user);
        
          setTimeout(() => {
              if (this.previousUrl) {
                  this.router.navigate([this.previousUrl]); 
      } else{
            this.router.navigate(['/dashboard']); 
      }        }, 2000);
  }
    });
}
  ngOnInit() {
  
      if (this.authGuard.redirectUrl) {
          this.toastr.error('You must be logged in to view that page.', 'Oops!'); 
        this.previousUrl = this.authGuard.redirectUrl; 
  this.authGuard.redirectUrl = undefined; 
  }
  }
}
