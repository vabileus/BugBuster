import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entity/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findOne(id: string): Promise<Project> {
    return this.projectsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}