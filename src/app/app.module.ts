import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {SignUpComponent} from './components/auth/sign-up/sign-up.component';
import {SignInComponent} from './components/auth/sign-in/sign-in.component';
import {SignUpSuccessComponent} from './components/auth/sign-up-success/sign-up-success.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {Ng2Webstorage} from "ngx-webstorage";
import {HomeComponent} from './components/home/home.component';
import {CreatePostComponent} from './components/create-post/create-post.component';
import {EditorModule} from "@tinymce/tinymce-angular";
import {HttpClientInterceptor} from "./http-client-interceptor";
import {PostComponent} from './components/post/post.component';
import {AuthGuard} from "./guards/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    SignInComponent,
    SignUpSuccessComponent,
    HomeComponent,
    CreatePostComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Webstorage.forRoot(),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'sign-in', component: SignInComponent},
      {path: 'sign-up-success', component: SignUpSuccessComponent},
      {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
      {path: 'post/:id', component: PostComponent}
    ]),
    HttpClientModule,
    EditorModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
