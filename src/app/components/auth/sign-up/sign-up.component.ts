import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SignUpRequestPayload} from "../../../models/sign-up-request-payload";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  signUpRequestPayload: SignUpRequestPayload;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.formBuilder.group({
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    });

    this.signUpRequestPayload = {
      username: '',
      password: '',
      confirmPassword: '',
      email: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signUpRequestPayload.username = this.signUpForm.get('username').value;
    this.signUpRequestPayload.password = this.signUpForm.get('password').value;
    this.signUpRequestPayload.confirmPassword = this.signUpForm.get('confirmPassword').value;
    this.signUpRequestPayload.email = this.signUpForm.get('email').value;

    this.authService.signUp(this.signUpRequestPayload).subscribe(data => {
      console.log("You have successfully signed up.");
    }, error => {
      console.log(`Signing up failed: ${error}`);
    });
  }
}
