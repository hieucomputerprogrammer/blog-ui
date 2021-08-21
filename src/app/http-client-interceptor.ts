import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {LocalStorageService} from "ngx-webstorage";
import {Observable} from "rxjs";

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private $localStorage: LocalStorageService) { }

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.$localStorage.retrieve("jwt");
    console.log('JWT: ' + jwt);
    if (jwt) {
      const cloned = httpRequest.clone({
        headers: httpRequest.headers.set("Authorization", "Bearer " + jwt)
      });

      return httpHandler.handle(cloned);
    } else {
      return httpHandler.handle(httpRequest);
    }
  }
}
