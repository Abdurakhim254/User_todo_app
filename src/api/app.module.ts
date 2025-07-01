import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TasksModule } from './tasks/tasks.module';
@Module({
  imports: [AuthModule, AdminModule, TasksModule],
})
export class AppModule {}
