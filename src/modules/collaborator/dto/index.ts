import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  last_name!: string;

  @IsInt()
  @IsNotEmpty()
  genderId!: number;

  //   @IsUUID('4')
  //   @IsNotEmpty()
  //   CompanyId!:string

  @IsNotEmpty()
  @IsInt()
  age!: number;
}

export class deleteCollaboratorDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  @IsNotEmpty()
  @IsUUID('4')
  UserId!: string;
}
