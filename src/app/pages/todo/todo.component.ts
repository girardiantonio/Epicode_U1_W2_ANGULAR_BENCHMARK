import { Component } from '@angular/core';
import { Todo } from 'src/app/class/todo';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  todos: Todo[] = [];
  newTodo: Todo = new Todo(0, '', false);
  testo: string = '';

  constructor(private todoSvc: TodoService) {}

  ngOnInit() {
    this.todoSvc.load().then((todos) => {
      this.todos = todos.filter((todo) => todo.completed == false);
      this.updateLabelTesto();
    });
  }

  check(): boolean {
    if (!this.newTodo.title) return true;
    return false;
  }

  nuovaTask() {
    this.todoSvc.createAndUpdateStatus(this.newTodo);
    alert('Task creata con successo');
    this.todos.push(this.newTodo);
    this.newTodo = new Todo(0, '', false);
    this.updateLabelTesto();
  }

  completed(todo: Todo) {
    alert('Task completata con successo');
    todo.completed = todo.completed === true ? false : true;
    this.todoSvc.createAndUpdateStatus(todo);
    this.todos = this.todos.filter((t) => t.completed == false);
    this.updateLabelTesto();
  }

  updateLabelTesto(): void {
    this.testo =
      this.todos.length > 0
        ? 'Inserisci una nuova task'
        : 'Tutte le task, sono completate!';
  }
}
