import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SignInRequestPayload} from "../../../models/sign-in-request-payload";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  signInRequestPayload: SignInRequestPayload;

  constructor(private authService: AuthService, private router: Router) {
    this.signInForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });

    this.signInRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.signInRequestPayload.username = this.signInForm.get("username").value;
    this.signInRequestPayload.password = this.signInForm.get("password").value;

    this.authService.signIn(this.signInRequestPayload).subscribe(data => {
      if (data) {
        console.log("You are successfully signed in.");
        this.router.navigateByUrl('/');
      } else {
        console.log(`Sign in failed.`);
      }
    }, error => {
      console.log(`Sign in failed: ${error}`);
    });
  }
}
