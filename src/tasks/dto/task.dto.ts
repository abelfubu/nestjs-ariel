import { IsIn, IsNotEmpty } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsIn(['OPEN', 'DONE', 'IN_PROGRESS'])
  status: string;
}
