import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignUpRequestPayload} from "../models/sign-up-request-payload";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: 'http://localhost:8080/api/auth'; // TODO: fix URL passed into httpClient POST request not parsing correctly.

  constructor(private httpClient: HttpClient) { }

  signUp(signUpRequestPayload: SignUpRequestPayload): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/api/auth/sign-up`, signUpRequestPayload);
  }
}
