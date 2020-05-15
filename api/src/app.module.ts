import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportController } from './report/report.controller';
import { ProjectController } from './project/project.controller';
import { UserController } from './user/user.controller';
import { ProjectService } from './project/project.service';
import { ReportService } from './report/report.service';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController, ReportController, ProjectController, UserController],
  providers: [AppService, ProjectService, ReportService, UserService],
})
export class AppModule {}
