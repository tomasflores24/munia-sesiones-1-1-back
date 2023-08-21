import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

class BaseMembershipDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;
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

  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;
}

export class StatusIdMembershipDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;
}
