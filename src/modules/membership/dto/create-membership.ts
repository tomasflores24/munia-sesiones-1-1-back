import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class MembershipIdDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;
}
export class MembershipDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  isActive!: boolean;

  @IsNotEmpty()
  isDelete!: boolean;
}
