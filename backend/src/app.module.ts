import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentModule } from './agent/agent.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AgentModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
