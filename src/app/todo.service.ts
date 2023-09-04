import { Injectable } from '@angular/core';
import { Todo } from './class/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private dbUrl: string = 'http://localhost:3000/todo';

  constructor() {}

  async load(): Promise<Todo[]> {
    const res = await this.sendRequest(this.dbUrl);
    return res.json();
  }

  async createAndUpdateStatus(todo: Todo): Promise<Todo> {
    try {
      let res: Response;

      if (todo.id) {
        // Se la task ha un ID, effettua una richiesta PUT per aggiornare lo stato
        res = await this.sendRequest(this.dbUrl + '/' + todo.id, 'PUT', todo);
      } else {
        // Se la task non ha un ID, effettua una richiesta POST per crearla
        res = await this.sendRequest(this.dbUrl, 'POST', todo);
      }

      if (res.status === 200) {
        console.log('Operazione completata con successo.');
        return res.json();
      } else {
        console.log("Errore durante l'operazione:", res.status);
        throw new Error('Operazione non riuscita');
      }
    } catch (err) {
      console.error("Errore durante l'operazione:", err);
      throw err; // Rilancia l'errore per gestirlo nei componenti
    }
  }

  async delete(todo: Todo) {
    const res = await this.sendRequest(this.dbUrl + '/' + todo.id, 'DELETE');
    return res.json();
  }

  private async sendRequest(
    url: string,
    method: string = 'GET',
    data: any = null
  ): Promise<Response> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const options: RequestInit = {
      method: method,
      headers: headers,
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    return await fetch(url, options);
  }
}
