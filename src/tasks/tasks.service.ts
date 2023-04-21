import { Injectable } from '@nestjs/common';
import { Todo } from './entities/task.entity';
import { AddTodoDto } from './dto/add-todo.dto';

@Injectable()
export class TodoService {
    todos: Todo[];

    getTodos(): Todo[] {
        return this.todos;
    }
    addTodos(newTodo: AddTodoDto): Todo {
        const todo = new Todo();
        const { name, description } = newTodo;
        // todo.name = name;
        // todo.description = description;

        let id
        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1;
        } else {
            id = 1;
        }
        return {
            id,
            name,
            description,
            createdAtt: new Date()

        }
        // this.todos.push(todo);
        // return todo;
    }
}
