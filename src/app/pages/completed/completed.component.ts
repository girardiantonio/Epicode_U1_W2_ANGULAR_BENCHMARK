import { Component } from '@angular/core';
import { Todo } from 'src/app/class/todo';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.scss'],
})
export class CompletedComponent {
  todos: Todo[] = [];
  testo: string = '';
  constructor(private todoSvc: TodoService) {}

  ngOnInit() {
    this.todoSvc.load().then((todos) => {
      this.todos = todos.filter((todo) => todo.completed !== false);
      this.updateTesto();
    });
  }

  remove(todo: Todo) {
    this.todoSvc.delete(todo).then(() => {
      alert('Task eliminata con successo');
      this.todos = this.todos.filter((t) => t.id !== todo.id);
      this.updateTesto();
    });
  }

  updateTesto(): void {
    this.testo =
      this.todos.length > 0 ? '' : 'Hai completato tutte le tue tasks';
  }
}
