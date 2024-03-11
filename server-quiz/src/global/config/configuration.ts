import { registerAs } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min, validateSync, IsNotEmpty } from 'class-validator';

import { Environment } from '../../common';

export class ConfigType {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: string;

  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  PORT: number;

  @IsNotEmpty()
  MONGO_URI: string;
}

export default registerAs<ConfigType>('app', () => {
  const validatedConfig = plainToClass(ConfigType, process.env, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return {
    NODE_ENV: process.env.NODE_ENV ?? Environment.Development,
    PORT: parseInt(process.env.PORT ?? '3000', 10),
    MONGO_URI: process.env.MONGO_URI,
  };
});
