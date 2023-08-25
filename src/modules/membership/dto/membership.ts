import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
  @IsString()
  id!: string;
}

export class CreateMembershipDTO extends BaseMembershipDTO {}

export class UpdateMembership extends BaseMembershipDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;
}

export class StatusIdMembershipDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;

  @IsNotEmpty()
  @IsBoolean()
  isActive!: boolean;
}
