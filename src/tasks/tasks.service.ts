import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entities/task.entity';
import { AddTodoDto } from './dto/add-todo.dto';

@Injectable()
export class TodoService {
    todos: Todo[] = [];

    getTodos(): Todo[] {
        return this.todos;
    }
    addTodos(newTodo: AddTodoDto): Todo {
        //const todo = new Todo();
        const { name, description } = newTodo;
        // todo.name = name;
        // todo.description = description;

        let id;
        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1;
        } else {
            id = 1;
        }
        const todo = {
            id,
            name,
            description,
            createdAt: new Date()
        };
        this.todos.push(todo);
        return todo;
    }



    //     return {
    //         id,
    //         name,
    //         description,
    //         createdAtt: new Date()

    //     }


    //     // this.todos.push(todo);
    //     // return todo;
    // }
    getTodoById(id: number): Todo {
        const todo = this.todos.find((actualTodo) => actualTodo.id === id);
        if (todo)
            return todo;
        throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    deleteTodo(id: number) {
        const index = this.todos.findIndex((todo: Todo) => todo.id === +id);

        if (index >= 0) {

            this.todos.splice(index, 1);
        } else {
            throw new NotFoundException('not exist')
        }
        //console.log('Supprimer un todo de la liste des todos');
        return {
            message: `La task d'id ${id} supprimé :) `,
            count: 1
        };
    }
    updateTodo(id: number, newTodo: Partial<Todo>) {
        const todo = this.getTodoById(id);
        todo.description = newTodo.description ? newTodo.description : todo.description;
        todo.name = newTodo.name ? newTodo.name : todo.name;
        return todo;
    }
}
