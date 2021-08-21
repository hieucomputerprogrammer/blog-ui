import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;
  id: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });

    this.postService.getPostById(this.id).subscribe((data:Post) => {
      this.post = data;
    }, (error:any) => {
      console.log(`Post with ID number: ${this.id} is not found.`);
    });
  }
}
