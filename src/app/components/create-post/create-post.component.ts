import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Post} from "../../models/post";
import {Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  post: Post;

  constructor(private router: Router, private postService: PostService) {
    this.createPostForm = new FormGroup({
      title: new FormControl(''),
      content: new FormControl('')
    });

    this.post = {
      id: '',
      title: '',
      content: '',
      username: ''
    }
  }

  ngOnInit(): void {
  }

  createPost(): void {
    this.post.title = this.createPostForm.get('title').value;
    this.post.content = this.createPostForm.get('content').value;
    this.postService.createPost(this.post).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      console.log(`Creating post failed.`);
    });
  }
}
