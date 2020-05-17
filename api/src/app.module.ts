import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BugsModule } from './bugs/bugs.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, BugsModule, ProjectsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {
  constructor(private connection: Connection) {}
}
