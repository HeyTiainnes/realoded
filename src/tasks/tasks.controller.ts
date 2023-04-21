import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/task.entity';
import { GetPaginatedDto } from './dto/getPaginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './tasks.service';

@Controller('todo')
export class TodoController {
    constructor(
        private todoService: TodoService

    ) { }
    todos: Todo[];
    @Get('v2')
    getTodosV2(
        @Req() request: Request,
        @Res() response: Response
    ) {
        console.log('Récupérer la liste des todos');
        response.status(205);
        response.json({
            contenu: `Je suis une réponse générée à partir de l'objet Response de express`
        })
    }

    @Get()
    getTodos(
        @Query() mesQueryParams: GetPaginatedDto
    ) {
        console.log(mesQueryParams);
        return this.todoService.getTodos();
    }
    //
    @Get('/:id')
    getTodoById(
        @Param('id') id
    ) {
        const todo = this.todos.find((actualTodo) => actualTodo.id === +id);
        if (todo)
            return todo;
        throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }

    @Post()
    addTodo(
        @Body() newTodo: AddTodoDto
    ) {
        const todo = new Todo();
        const { name, description } = newTodo;
        todo.name = name;
        todo.description = description;


        if (this.todos.length) {
            todo.id = this.todos[this.todos.length - 1].id + 1;
        } else {
            todo.id = 1;
        }
        this.todos.push(todo);
        return todo;
    }

    @Delete(':id')
    deleteTodo(
        @Param('id') id
    ) {
        const index = this.todos.findIndex((todo: Todo) => todo.id === +id);

        if (index >= 0) {

            this.todos.splice(index, 1);

        } else {

            throw new NotFoundException('not exist')
        }
        //console.log('Supprimer un todo de la liste des todos');
        return {
            message: `La task d'id ${id} supprimé :) `
        };
    }
    @Put(':id')
    modifierTodo(
        @Param('id') id,
        @Body() newTodo: Partial<AddTodoDto>
    ) {
        ;
        const todo = this.getTodoById(id);
        todo.description = newTodo.description ? newTodo.description : todo.description;
        todo.name = newTodo.name ? newTodo.name : todo.name;
        return todo;
    }
}