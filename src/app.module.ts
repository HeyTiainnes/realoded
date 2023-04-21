import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './tasks/tasks.module';

@Module({
  imports: [TodosModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
//