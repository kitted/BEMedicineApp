import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { AdminController } from '../decorators/swagger';
import { PatientService } from 'src/collection/patient/patient.service';
import { CreatePatientDto } from 'src/collection/patient/dtos/create-patient.dto';
import { QueryDto } from 'src/core/dtos/query.dto';
import { ID } from 'src/core/interfaces/id.interface';
import { ParseIdPipe } from 'src/core/pipes/parseId.pipe';

@AdminController(['patient'])
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @ApiOperation({ summary: 'paginate' })
  @Get('paginate')
  async export(@Query() query: QueryDto) {
    return await this.service.findPatient(query);
  }

  @ApiOperation({ summary: 'by id' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async getById(@Param('id', ParseIdPipe) id: ID) {
    return await this.service.findById(id);
  }

  @ApiOperation({ summary: 'update' })
  @ApiParam({ name: 'id', required: true })
  @Patch(':id')
  async update(
    @Param('id', ParseIdPipe) id: ID,
    @Body() dto: CreatePatientDto,
  ) {
    return await this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'delete' })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  async delete(@Param('id', ParseIdPipe) id: ID) {
    return await this.service.delete(id);
  }

  @ApiOperation({ summary: 'create' })
  @Post()
  async create(@Body() dto: CreatePatientDto) {
    return await this.service.create(dto);
  }
}
