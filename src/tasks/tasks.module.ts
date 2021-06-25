import { Module } from '@nestjs/common';
import { DataModule } from 'src/data/data.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [DataModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
