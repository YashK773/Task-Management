import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/to-do.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'], 
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
    const newTodo: Todo = { 
      title: 'New Todo', 
      description: 'Description of new todo', 
      dueDate: new Date().toISOString().split('T')[0],
      completed: false 
    };
    this.todoService.addTodo(newTodo).subscribe(() => this.loadTodos());
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }

  markAsCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe(() => this.loadTodos());
  }
  
}
