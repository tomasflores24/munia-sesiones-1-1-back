import { IsNotEmpty, IsString } from 'class-validator';

class BaseCategoryDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class SearchIdCategoryDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;
}

export class CreateCategoryDTO extends BaseCategoryDTO {}

export class UpdateCategoryDTO extends BaseCategoryDTO {
  @IsNotEmpty()
  @IsString()
  id!: string;
}
