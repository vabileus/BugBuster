import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  save(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findOneBy(query: Object): Promise<User> {
    return this.usersRepository.findOne(query);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}