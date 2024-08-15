import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import  { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [TasksModule,MongooseModule.forRoot('mongodb+srv://sahilsindhu:dummy@task-management.hmq93.mongodb.net/test-1?retryWrites=true&w=majority&appName=task-management')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
