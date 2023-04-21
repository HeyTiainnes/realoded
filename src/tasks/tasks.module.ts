import { Module } from '@nestjs/common';
import { TodoController } from './tasks.controller';
import { TodoService } from './tasks.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodosModule { }
