import { Module } from '@nestjs/common';
import { UsersModule } from 'src/collection/users/users.module';
import { UsersController } from './controllers/users';
import { PatientModule } from 'src/collection/patient/patient.module';
import { PatientController } from './controllers/patient';
import { ProfileModule } from 'src/collection/profile/profile.module';
import { ProfileController } from './controllers/profile';
@Module({
  imports: [UsersModule, PatientModule, ProfileModule],
  controllers: [UsersController, PatientController, ProfileController],
})
export class AdminModule {}
