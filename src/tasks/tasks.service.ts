import { Injectable } from '@nestjs/common';
import { Todo } from './entities/task.entity';

@Injectable()
export class TodoService {
    todos: Todo[];

    getTodos(): Todo[] {

        return this.todos;
    }

}
