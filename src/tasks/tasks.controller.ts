import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDocument } from './task.schema';  // Import TaskDocument
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    async getTasks(@Query() filterDto: GetTaskFilterDto): Promise<TaskDocument[]> {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTaskWithFilters(filterDto);
        } else {
            return this.tasksService.getAllTasks();
        }
    }
    
    @Get('/:id')
    async getTaskById(@Param('id') id: string): Promise<TaskDocument> {
        return this.tasksService.getTaskById(id);
    }

    @Patch('/:id')
    async updateTaskStatusById(
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskStatusDto
    ): Promise<TaskDocument> {
        const { status } = updateTaskDto;
        return this.tasksService.updateTaskStatusById(id, status);
    }

    @Post()
    async createTask(@Body() createTaskDto: CreateTaskDto): Promise<TaskDocument> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    async deleteTaskById(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }
}
