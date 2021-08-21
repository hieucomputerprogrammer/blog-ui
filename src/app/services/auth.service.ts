import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignUpRequestPayload} from "../models/sign-up-request-payload";
import {Observable} from "rxjs";
import {SignInRequestPayload} from "../models/sign-in-request-payload";
import {AuthenticationResponse} from "../models/authentication-response";
import {LocalStorageService} from "ngx-webstorage";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: 'http://localhost:8080/api/auth'; // TODO: fix URL passed into httpClient POST request not parsing correctly.

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { }

  signUp(signUpRequestPayload: SignUpRequestPayload): Observable<any> {
    return this.httpClient.post(`http://localhost:8080/api/auth/sign-up`, signUpRequestPayload);
  }

  signIn(signInRequestPayload: SignInRequestPayload): Observable<boolean> {
    return this.httpClient.post<AuthenticationResponse>(`http://localhost:8080/api/auth/sign-in`, signInRequestPayload)
      .pipe(map(data => {
        this.localStorageService.store("jwt", data.jwt);
        this.localStorageService.store("username", data.username);
        return true;
      })
    );
  }

  isAuthenticated(): boolean {
    return this.localStorageService.retrieve('username') != null;
  }

  signOut(): void {
    this.localStorageService.clear('jwt');
    this.localStorageService.clear('username');
  }
}
