import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { BugsService } from './bugs.service';
import { Bug } from './entity/bug.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('bugs')
export class BugsController {
    constructor(private readonly bugsService: BugsService) {}

    @Get()
    findAll(): Promise<Bug[]> {
        return this.bugsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<Bug> {
        return this.bugsService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<void> {
        return this.bugsService.remove(id);
    }
}