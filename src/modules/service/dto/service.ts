import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

class BaseServiceDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class SearchIdServiceDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;
}

export class CreateServiceDTO extends BaseServiceDTO {
  @IsNotEmpty()
  @IsNumber()
  CategoryId!: number;
}

export class UpdateServiceDTO extends BaseServiceDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  CategoryId?: number;
}
