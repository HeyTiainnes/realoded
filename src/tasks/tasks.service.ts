import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksEntity } from './entities/task.entity';
import { AddTodoDto } from './dto/add-todo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from 'src/user/entites/user.entity';

@Injectable()
export class TodoService {
    todos: TasksEntity[] = [];
    //userRepository: UsersEntity;

    constructor(
        @InjectRepository(TasksEntity)
        private TaskRepository: Repository<TasksEntity>,
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>

    ) {

    }

    async getTasks(): Promise<TasksEntity[]> {
        return await this.TaskRepository.find();
    }

    async addTodos(newTodo: AddTodoDto, utilisateurId: number): Promise<TasksEntity> {
        const utilisateur = await this.userRepository.findOne({ where: { id: utilisateurId } });

        if (!utilisateur) {
            throw new NotFoundException(`User with id ${utilisateurId} does not exist.`);
        }

        const todoData = { ...newTodo, user: utilisateur };
        let todo = new TasksEntity();
        Object.assign(todo, todoData);

        return this.TaskRepository.save(todo);
    }

    getTodoById(id: number): TasksEntity {
        const todo = this.todos.find((actualTodo) => actualTodo.id === id);
        if (todo)
            return todo;
        throw new NotFoundException(`Le todo d'id ${id} n'existe pas`);
    }
    deleteTodo(id: number) {
        const index = this.todos.findIndex((todo: TasksEntity) => todo.id === +id);

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
    updateTodo(id: number, newTodo: Partial<TasksEntity>) {
        const todo = this.getTodoById(id);
        todo.designation = newTodo.designation ? newTodo.designation : todo.designation;
        //todo.name = newTodo.name ? newTodo.name : todo.name;
        return todo;
    }
}
