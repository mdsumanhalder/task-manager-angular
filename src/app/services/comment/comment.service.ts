import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) {}

  getComments(taskId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/task/${taskId}`);
  }

  addComment(comment: any): Observable<any> {
    return this.http.post(this.apiUrl, comment);
  }
}
