import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// messageClass;
//   message;
// processing = false;
  loginform:FormGroup;

  constructor(private formBuilder: FormBuilder,public router: Router) 
  {
    this.createForm();
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
 
//   disableForm() {
//     this.form.controls['email'].disable(); 
//     this.form.controls['password'].disable(); 
// }
 
//   enableForm() {
//     this.form.controls['email'].enable();
//     this.form.controls['password'].enable(); 
//   }

onLogin()
{
// 	 // this.processing = true; 
//     this.disableForm(); 
    
    const user = {
      email: this.loginform.get('email').value, 
      password: this.loginform.get('password').value
    }
    console.log(user);
    if(user){
setTimeout(() => {
         this.router.navigate(['/dashboard']); 
        }, 1000);
    }
    // else{
    // 	this.messageClass = 'alert alert-danger'; 
    //     this.message = 'Please Enter Valid credientials';
    // }

}
  ngOnInit() {
  }

}
