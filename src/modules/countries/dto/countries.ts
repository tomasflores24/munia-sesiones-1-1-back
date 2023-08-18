import { IsNotEmpty, IsString } from "class-validator";

class BaseCountriesDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  latlong!: string;

  @IsNotEmpty()
  @IsString()
  areaCode!: string;

  @IsNotEmpty()
  @IsString()
  abv!: string;

  @IsNotEmpty()
  @IsString()
  currency!: string;

  @IsNotEmpty()
  @IsString()
  flag!: string;
}

export class CreateCountriesDTO extends BaseCountriesDTO {}
