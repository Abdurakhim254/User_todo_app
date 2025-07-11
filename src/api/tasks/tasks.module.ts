import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule} from '@/common/prisma';

@Module({
  // imports:[PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
