import { Module } from '@nestjs/common';
import { TodoController } from './tasks.controller';
import { TodoService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksEntity } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TasksEntity])],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TaskModule { }
