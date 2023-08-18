import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

class BaseMembershipDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isDelete!: boolean;
}

export class SearchIdMembershipDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;
}

export class CreateMembershipDTO extends BaseMembershipDTO {}

export class UpdateMembership extends BaseMembershipDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;
}
