import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class GetByIdCollaboratorDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;
}

export class UpdateCollaboratorDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  @IsNotEmpty()
  @IsUUID('4')
  UserId!: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsInt()
  genderId?: number;

  //   @IsUUID('4')
  //   @IsNotEmpty()
  //   CompanyId!:string

  @IsOptional()
  @IsInt()
  age!: number;
}

export class deleteCollaboratorDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;
}
