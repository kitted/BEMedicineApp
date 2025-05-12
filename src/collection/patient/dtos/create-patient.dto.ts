import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { SexEnum } from '../interfaces/sex.enum';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @ApiProperty({
    required: true,
    type: String,
    example: 'Marcus',
  })
  @IsString()
  username: string;

  @ApiProperty({ required: true, type: Number, example: 1 })
  @IsNumber()
  @Type(() => Number)
  age: number;

  @ApiProperty({
    required: true,
    type: String,
    example: 'address',
  })
  @IsString()
  address: string;

  @ApiProperty({
    required: true,
    enum: SexEnum,
    example: SexEnum.MALE,
  })
  @IsOptional()
  @IsEnum(SexEnum)
  sex: SexEnum;
}
