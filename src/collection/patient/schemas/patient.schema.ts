import { BaseModel } from '../../../core/base.model';
import { prop } from '@typegoose/typegoose';
import { SexEnum } from '../interfaces/sex.enum';

export class Patients extends BaseModel {
  @prop({ required: true })
  username: string;

  @prop({ required: true })
  age: number;

  @prop({ required: true })
  address: string;

  // @prop({ required: true })
  // phoneNumber: string;

  @prop({ enum: SexEnum, required: true })
  sex: SexEnum;
}
