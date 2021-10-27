import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from './post.model';
import { PostsService } from './post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post!: Post;
  private mode = 'create';
  private _id!: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paraMap: ParamMap) => {
      if (paraMap.has('_id')) {
        this.mode = 'edit';
        this._id = paraMap.get('_id')!;
        this.postsService.getPost(this._id).subscribe((postData) => {
          this.post = {
            _id: postData._id,
            title: postData.title,
            content: postData.content,
          };
        });
      } else {
        this.mode = 'create';
        this._id = '';
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updatePost(
        this._id,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
