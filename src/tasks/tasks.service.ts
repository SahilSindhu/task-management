import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
@Injectable()
export class TasksService {
    private tasks:Task[] = [];

    getAllTasks():Task[] {
        return this.tasks;
    }

    getTaskById(id: string):Task{
        return this.tasks.find((task)=>task.id === id)
    } 

    createTask(createTaskDto:CreateTaskDto):Task {
        const {title,description} = createTaskDto;
        const task:Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task)
        return task;
    }

    updateTaskStatusById(id: string,status:TaskStatus):Task{
        const index = this.tasks.findIndex((task)=>task.id == id);
        const updatedTask = {...this.tasks[index],status}
        this.tasks[index] = updatedTask;
        return this.tasks[index]
    }

    deleteTaskById(id: string):void{
        const newTasks = this.tasks.filter((task)=>task.id !== id)
        this.tasks = newTasks;
    } 

    getTaskWithFilters(filterDto: GetTaskFilterDto):Task[]{
        const {status,search} = filterDto;
        let tasks = this.tasks;
        if(status){
            tasks = tasks.filter((task) =>{
                return task.status === status
            })
        }
        if(search){
            tasks = tasks.filter((task) =>{
                return task.description.toLowerCase()===search.toLowerCase() || task.title.toLowerCase()===search.toLowerCase()
            })
        }
        return tasks
    }
}
