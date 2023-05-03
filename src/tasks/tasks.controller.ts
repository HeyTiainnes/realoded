import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { TasksEntity } from './entities/task.entity';
import { GetPaginatedDto } from './dto/getPaginated-todo.dto';
import { AddTodoDto } from './dto/add-todo.dto';
import { TodoService } from './tasks.service';
//import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion/upper-and-fusion.pipe';
import { DurationInterceptor } from 'src/interceptor/duration/duration.interceptor';
import { JwtAuthGuard } from 'src/user/Guards/jwt-auth.guard';
import { UsersEntity } from 'src/user/entites/user.entity';

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
    @UseGuards(JwtAuthGuard)
    async getTodos(
        @Query() mesQueryParams: GetPaginatedDto
    ): Promise<TasksEntity[]> {
        console.log(mesQueryParams);
        const tasks = await this.todoService.getTasks();
        return tasks;
    }
    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    getTodoById(
        @Param('id', ParseIntPipe) id
    ) {
        const todo = this.todos.find((actualTodo) => actualTodo.id === +id);
        if (todo)
            return this.todoService.getTodoById(id);
        throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    async addTodo(
        @Body() newTodo: AddTodoDto,
        @Req() request: Request,
        // @User()
        // @Body('utilisateurId', ParseIntPipe) utilisateurId: number
    ): Promise<TasksEntity> {
        console.log('user de la request :', request.user);
        const user = request.user as UsersEntity;
        return await this.todoService.addTodos(newTodo, user);
    }
    @Delete(':id',)
    @UseGuards(JwtAuthGuard)
    deleteTodo(
        @Param('id', ParseIntPipe) id
    ) {
        return this.todoService.deleteTodo(+id);
    }
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async modifierTodo(
        @Param('id', ParseIntPipe) id,
        @Body() newTodo: Partial<AddTodoDto>
    ): Promise<void> {
        const todoToUpdate: Partial<TasksEntity> = {
            designation: newTodo.designation,
        };
        await this.todoService.updateTodo(id, todoToUpdate);
    }
}
