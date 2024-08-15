import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>, 
  ) {}

  async getAllTasks(): Promise<TaskDocument[]> {  
    return this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<TaskDocument> { 
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskDocument> { 
    const { title, description } = createTaskDto;
    const task = new this.taskModel({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    return task.save();
  }

  async updateTaskStatusById(id: string, status: TaskStatus): Promise<TaskDocument> {     
    const task = await this.taskModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return task;
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async getTaskWithFilters(filterDto: GetTaskFilterDto): Promise<TaskDocument[]> {  
    const { status, search } = filterDto;
    const query = this.taskModel.find();

    if (status) {
      query.where('status').equals(status);
    }

    if (search) {
      query.or([
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]);
    }

    return query.exec();
  }
}
