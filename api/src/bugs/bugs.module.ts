import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BugsService } from './bugs.service';
import { BugsController } from './bugs.controller';
import { Bug } from './entity/bug.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bug])],
  providers: [BugsService],
  controllers: [BugsController],
  exports: [BugsService]
})
export class BugsModule {}