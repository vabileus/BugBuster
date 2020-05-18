import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './entity/project.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Get()
    findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Project> {
        return this.projectsService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<void> {
        return this.projectsService.remove(id);
    }
}