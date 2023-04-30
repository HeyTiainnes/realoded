import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { TasksEntity } from './entities/task.entity';
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
    todos: TasksEntity[];
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
    async getTodos(
        @Query() mesQueryParams: GetPaginatedDto
    ): Promise<TasksEntity[]> {
        console.log(mesQueryParams);
        const tasks = await this.todoService.getTasks();
        return tasks;
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
    ): TasksEntity {
        return this.todoService.addTodos(newTodo);
    }

    @Delete(':id',)
    deleteTodo(
        @Param('id', ParseIntPipe) id
    ) {


        return this.todoService.deleteTodo(+id);

    }
    // @Put(':id')
    // modifierTodo(
    //     @Param('id', ParseIntPipe) id,
    //     @Body() newTodo: Partial<AddTodoDto>
    // ) {

    //     return this.todoService.updateTodo(id, newTodo);
    // }
    @Put(':id')
    async modifierTodo(
        @Param('id', ParseIntPipe) id,
        @Body() newTodo: Partial<AddTodoDto>
    ): Promise<void> {
        const todoToUpdate: Partial<TasksEntity> = {
            // copier les propriétés de AddTodoDto à TasksEntity
            designation: newTodo.designation,
            // initialisez les autres champs comme vous le jugez nécessaire
            // ...
        };

        await this.todoService.updateTodo(id, todoToUpdate);
    }
    @Post('testPipe')

    testPipe(@Body(UpperAndFusionPipe) data) {

        return data;

    }

}
