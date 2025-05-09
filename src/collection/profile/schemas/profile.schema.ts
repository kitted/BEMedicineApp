import { BaseModel } from '../../../core/base.model';
import { prop, Ref } from '@typegoose/typegoose';
import { Patients } from 'src/collection/patient/schemas/patient.schema';

export class Profiles extends BaseModel {
  @prop({ ref: () => Patients })
  patient: Ref<Patients>;

  @prop()
  diagnosis: string;

  @prop()
  ecg: [];

  @prop()
  result: string;
}
