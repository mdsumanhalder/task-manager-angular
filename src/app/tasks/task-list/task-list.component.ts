import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from 'src/app/services/task/task.service';
import { NbLayoutModule } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Task } from 'src/app/Interfaces/ITask';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NbLayoutModule, ReactiveFormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;
  editingTask: Task | null = null;
  constructor(
    private taskService: TaskService,
    public authService: AuthService,
    private fb: FormBuilder
  ) {
    // Initialize the form
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  createTask(): void {
    if (this.taskForm.valid) {
      this.taskService.createTask(this.taskForm.value).subscribe((task) => {
        this.tasks.push(task);
        this.taskForm.reset(); // Reset form after submission
      });
    }
  }

  editTask(task: Task): void {
    this.editingTask = { ...task }; // Create a copy for editing
    this.taskForm.patchValue(task); // Populate form with task data
  }

  updateTask(): void {
    if (this.editingTask) {
      const updatedTask = { ...this.editingTask, ...this.taskForm.value };
      this.taskService.updateTask(updatedTask).subscribe((updatedTask) => {
        const index = this.tasks.findIndex((t) => t._id === updatedTask._id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.editingTask = null; // Clear editing task
        this.taskForm.reset(); // Reset form
      });
    }
  }

  deleteTask(id: string | undefined): void {
    if (id) {
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter((task) => task._id !== id);
      });
    } else {
      console.error('Task ID is undefined');
    }
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login'; // Redirect to login page after logout
  }
}
