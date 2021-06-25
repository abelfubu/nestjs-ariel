import { Task } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  constructor(private dataService: DataService) {}

  async getTasks(): Promise<Task[]> {
    return await this.dataService.task.findMany();
  }

  async addTask(task: TaskDto): Promise<Task> {
    return await this.dataService.task.create({ data: task });
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.dataService.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException();
    return task;
  }

  async deleteTask(id: string): Promise<Task> {
    const task = await this.dataService.task.findUnique({ where: { id } });
    if (!task) throw new NotFoundException();
    return task;
  }

  async updateTask(id: string, task: Partial<TaskDto>): Promise<Task> {
    const found = await this.dataService.task.findUnique({ where: { id } });
    if (!found) throw new NotFoundException();
    return await this.dataService.task.update({ where: { id }, data: task });
  }
}
