import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto):Task[]{
        if(Object.keys(filterDto)){
            return this.tasksService.getTaskWithFilters(filterDto)
        }else{
            return this.tasksService.getAllTasks();
        }
    }
    
    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
        return this.tasksService.getTaskById(id);
    }

    @Patch('/:id')
    updateTaskStatusById(@Param('id') id:string, @Body() updateTaskDto:UpdateTaskStatusDto):Task{
        const {status} = updateTaskDto;
        console.log(updateTaskDto)
        return this.tasksService.updateTaskStatusById(id,status);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto){
        return this.tasksService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string){
        return this.tasksService.deleteTaskById(id)
    }
}
