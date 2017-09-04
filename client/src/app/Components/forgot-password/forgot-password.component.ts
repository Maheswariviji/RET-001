import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    forgotForm: FormGroup;

constructor(
  private formBuilder: FormBuilder
) {
  this.createForm();
}
createForm() {
    this.forgotForm = this.formBuilder.group({
      // Email Input
      email: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(30), 
        this.validateEmail 
      ])]
    })
}

validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validateEmail': true } 
    }
  }

onforgotSubmit() {
  console.log('forgotForm submitted');
}
  ngOnInit() {
  }

}
