import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class ECG {
  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'rhythm',
  })
  @IsOptional()
  @IsString()
  rhythm?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'frequency',
  })
  @IsOptional()
  @IsString()
  frequency?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'cycle',
  })
  @IsOptional()
  @IsString()
  cycle?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'axis',
  })
  @IsOptional()
  @IsString()
  axis?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'corner',
  })
  @IsOptional()
  @IsString()
  corner?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'waveP',
  })
  @IsOptional()
  @IsString()
  waveP?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'distancePR',
  })
  @IsOptional()
  @IsString()
  distancePR?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'QRS',
  })
  @IsOptional()
  @IsString()
  QRS?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'waveT',
  })
  @IsOptional()
  @IsString()
  waveT?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'ST',
  })
  @IsOptional()
  @IsString()
  ST?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'distanceST',
  })
  @IsOptional()
  @IsString()
  distanceST?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'distanceQT',
  })
  @IsOptional()
  @IsString()
  distanceQT?: string;

  @ApiPropertyOptional({
    required: false,
    type: String,
    example: 'conclude',
  })
  @IsOptional()
  @IsString()
  conclude?: string;
}

export class CreateProfileDto {
  @ApiProperty({
    required: true,
    type: String,
    example: '65f94e34bac0cb9e64078d08',
  })
  @IsString()
  patient: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'diagnosis',
  })
  @IsString()
  diagnosis: string;

  @ApiProperty({ required: true, type: [ECG] })
  @IsArray()
  ecg: ECG[];

  @ApiProperty({
    required: true,
    type: String,
    example: 'result',
  })
  @IsString()
  result: string;
}
