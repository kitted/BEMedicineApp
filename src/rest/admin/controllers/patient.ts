import { Body, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AdminController } from '../decorators/swagger';
import { PatientService } from 'src/collection/patient/patient.service';
import { CreatePatientDto } from 'src/collection/patient/dtos/create-patient.dto';
import { QueryDto } from 'src/core/dtos/query.dto';

@AdminController(['patient'])
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @ApiOperation({ summary: 'paginate' })
  @Get('paginate')
  async export(@Query() query: QueryDto) {
    return await this.service.findPatient(query);
  }

  @ApiOperation({ summary: 'create' })
  @Post()
  async create(@Body() dto: CreatePatientDto) {
    return await this.service.create(dto);
  }
}
