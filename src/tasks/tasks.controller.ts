import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { Todo } from './entities/task.entity';
import { GetPaginatedDto } from './dto/getPaginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './tasks.service';
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion/upper-and-fusion.pipe';
import { DurationInterceptor } from 'src/interceptor/duration/duration.interceptor';

@UseInterceptors(DurationInterceptor)
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
    ): Todo[] {
        console.log(mesQueryParams);
        return this.todoService.getTodos();
    }
    //
    @Get('/:id')
    getTodoById(
        @Param('id', ParseIntPipe) id
    ) {
        const todo = this.todos.find((actualTodo) => actualTodo.id === +id);
        if (todo)
            return this.todoService.getTodoById(id);
        throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }

    @Post()
    addTodo(
        @Body() newTodo: AddTodoDto
    ): Todo {
        return this.todoService.addTodos(newTodo);
    }

    @Delete(':id',)
    deleteTodo(
        @Param('id', ParseIntPipe) id
    ) {


        return this.todoService.deleteTodo(+id);

    }
    @Put(':id')
    modifierTodo(
        @Param('id', ParseIntPipe) id,
        @Body() newTodo: Partial<AddTodoDto>
    ) {

        return this.todoService.updateTodo(id, newTodo);
    }

    @Post('testPipe')

    testPipe(@Body(UpperAndFusionPipe) data) {

        return data;

    }

}