import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bug } from './entity/bug.entity';

@Injectable()
export class BugsService {
  constructor(
    @InjectRepository(Bug)
    private bugsRepository: Repository<Bug>,
  ) {}

  findAll(): Promise<Bug[]> {
    return this.bugsRepository.find();
  }

  findOne(id: string): Promise<Bug> {
    return this.bugsRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.bugsRepository.delete(id);
  }
}