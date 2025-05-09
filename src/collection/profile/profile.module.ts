import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Profiles } from './schemas/profile.schema';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [TypegooseModule.forFeature([Profiles]), PatientModule],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
