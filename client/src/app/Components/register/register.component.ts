import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {AuthService} from '../../Services/regAuth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
domain="http://localhost:8080";
    registerForm: FormGroup;
emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;
  message;
  messageClass;
  processing = false;

constructor(
  private formBuilder: FormBuilder,
public router: Router,
public authService: AuthService
) {
  this.createForm(); 
}
createForm() {
  this.registerForm = this.formBuilder.group({
    email: ['', Validators.compose([
      Validators.required, 
      Validators.minLength(5), 
      Validators.maxLength(30), 
      this.validateEmail 
    ])],
    username: ['', Validators.compose([
      Validators.required,
      Validators.minLength(3), 
      Validators.maxLength(15), 
      this.validateUsername 
    ])],
    password: ['', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(35),
      this.validatePassword 
    ])],
    confirm: ['', Validators.required] 
  }, { validator: this.matchingPasswords('password', 'confirm') }); 
}

validateEmail(controls) {
  const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (regExp.test(controls.value)) {
    return null; 
  } else {
    return { 'validateEmail': true } 
  }
}

validateUsername(controls) {
  const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
  if (regExp.test(controls.value)) {
    return null; 
  } else {
    return { 'validateUsername': true } 
  }
}


validatePassword(controls) {  
  const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
  if (regExp.test(controls.value)) {
    return null; 
  } else {
    return { 'validatePassword': true } 
  }
}


matchingPasswords(password, confirm) {
  return (group: FormGroup) => {
   
    if (group.controls[password].value === group.controls[confirm].value) {
      return null; 
    } else {
      return { 'matchingPasswords': true } 
    }
  }
}


onRegisterSubmit() {
   console.log("form submitted");
    const user = {
            username: this.registerForm.get('username').value,
            email: this.registerForm.get('email').value, 
            password: this.registerForm.get('password').value
          }
          console.log(user);
this.authService.registerUser(user).subscribe(data => {
  console.log(data);
console.log("Registered");
setTimeout(() => {
          this.router.navigate(['/login']); 
        }, 1000);

});
}

checkEmail() {
   
    this.authService.checkEmail(this.registerForm.get('email').value).subscribe(data => {
     if (!data.success) {
        this.emailValid = false; 
        this.emailMessage = data.message; 
      } else {
        this.emailValid = true; 
        this.emailMessage = data.message; 
      }
    });
  }

  checkUsername() {
   this.authService.checkUsername(this.registerForm.get('username').value).subscribe(data => {
     if (!data.success) {
        this.usernameValid = false; 
        this.usernameMessage = data.message; 
      } else {
        this.usernameValid = true; 
        this.usernameMessage = data.message; 
      }
    });
  }
  google()
  {
    // console.log(this.router.url);
    // console.log(window.location.pathname);
   }

ngOnInit() {
}

}