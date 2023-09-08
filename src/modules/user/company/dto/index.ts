import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetByIdCompanyDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;
}

export class UpdateCompanyDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  @IsNotEmpty()
  @IsUUID('4')
  UserId!: string;

  @IsOptional()
  @IsInt()
  phone?: number;

  @IsString()
  @IsOptional()
  register_id?: string;
}

export class deleteCompanyDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;
}
