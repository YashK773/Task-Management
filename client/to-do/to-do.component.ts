import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../todo.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  imports: [
    NgFor,
  ],
  standalone: true,
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => {
      this.todos = data;
    });
  }

  addTodo() {
    const newTodo: Todo = { title: 'New Todo', completed: false };
    this.todoService.addTodo(newTodo).subscribe(() => this.loadTodos());
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}