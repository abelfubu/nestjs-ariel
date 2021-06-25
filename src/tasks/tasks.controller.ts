import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { TaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  @Post()
  addTask(@Body() task: TaskDto): Promise<Task> {
    return this.tasksService.addTask(task);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() task: Partial<TaskDto>,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, task);
  }
}
