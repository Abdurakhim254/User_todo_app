import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '@/config';
import { PrismaModule } from '@/common/prisma';
import { AuthGuard } from '@/common/guard/auth.guard';
@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({
      load: [jwtConfig],
      isGlobal: true,
    }),
    AuthModule, AdminModule, TasksModule
    ,PrismaModule
  ],
    providers:[{
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ]
})
export class AppModule {}
