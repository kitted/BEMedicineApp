import { Body, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { AdminController } from '../decorators/swagger';
import { CreateProfileDto } from 'src/collection/profile/dtos/create-profile.dto';
import { ProfileService } from 'src/collection/profile/profile.service';
import { ParseIdPipe } from 'src/core/pipes/parseId.pipe';
import { ID } from 'src/core/interfaces/id.interface';
import { QueryDto } from 'src/core/dtos/query.dto';

@AdminController(['profile'])
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @ApiOperation({ summary: 'get by patient' })
  @ApiParam({ name: 'id', required: true })
  @Get('patient/:id')
  async export(@Param('id', ParseIdPipe) id: ID, @Query() query: QueryDto) {
    return await this.service.findByPatient(id, query);
  }

  @ApiOperation({ summary: 'create' })
  @Post()
  async create(@Body() dto: CreateProfileDto) {
    return await this.service.create(dto);
  }
}
