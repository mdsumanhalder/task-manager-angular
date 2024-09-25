import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentService } from '../../services/comment/comment.service';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() taskId!: string;
  comments: any[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.commentService.getComments(this.taskId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Error loading comments:', error);
      }
    );
  }
}
