import { IsNotEmpty, IsNumber, IsUUID, IsDateString } from 'class-validator';

class BasePurchaseDTO {
  @IsNotEmpty()
  @IsNumber()
  purchased_sessions!: number;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsDateString()
  date_purchase!: Date;

  //@IsNotEmpty()
  //@IsUUID('4')
  //CompanyId!: string;
  
  @IsNotEmpty()
  @IsUUID('4')
  MembershipId!: string;

  @IsNotEmpty()
  @IsNumber()
  StatusId!: number;  
}

export class CreatePurchaseDTO extends BasePurchaseDTO {}
