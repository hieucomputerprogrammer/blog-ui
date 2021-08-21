import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "../models/post";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private httpClient: HttpClient) { }

  createPost(post: Post): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/posts`, post);
  }

  getPosts(): Observable<Array<Post>> {
    return this.httpClient.get<Array<Post>>(`http://localhost:8080/api/posts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`http://localhost:8080/api/posts/${id}`);
  }
}
