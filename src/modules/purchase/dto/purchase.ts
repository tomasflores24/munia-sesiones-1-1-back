import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

class BasePurchaseDTO {
  @IsNotEmpty()
  @IsNumber()
  purchased_sessions!: number;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsUUID('4')
  CompanyId!: string;

  @IsNotEmpty()
  @IsNumber()
  MembershipId!: number;

  @IsNotEmpty()
  @IsNumber()
  StatusId!: number;  
}

export class CreatePurchaseDTO extends BasePurchaseDTO {}

export class UpdatePurchaseDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;

  @IsNotEmpty()
  @IsNumber()
  StatusId!: number;
}
export class SearchIdPurchaseDTO {
  @IsNotEmpty()
  @IsUUID('4')
  id!: string;
}
