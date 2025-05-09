import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Patients } from './schemas/patient.schema';
import { PatientService } from './patient.service';
import { PatientController } from './patients.controller';

@Module({
  imports: [TypegooseModule.forFeature([Patients])],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
