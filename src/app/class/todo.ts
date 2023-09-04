export class Todo implements Todo {
  constructor(
    public id: number,
    public title: string,
    public completed: boolean
  ) {}
}
