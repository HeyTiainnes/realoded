import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';

@Controller('tasks')
export class TasksController {

    @Get()
    getTasks(
        @Req() request: Request,
        @Res() response: Response
    ) {
        //console.log(response);
        //console.log(request);
        console.log('recuperer liste tasks : ');
        return 'liste tasks';
    }

    @Post()
    AddTasks() {
        console.log('post new tsk : ');
        return 'Task ajouté';
    }

    @Delete()
    deleteTasks() {
        console.log('delete tsk ');
        return 'task suprimée';
    }
    @Put()
    putTasks() {
        console.log('Modif tsk ');
        return 'Put tasks';
    }

}
