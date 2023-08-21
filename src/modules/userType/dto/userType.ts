import { IsNotEmpty, IsString } from "class-validator";

class BaseUserTypeDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;
}

export class CreateUserTypeDTO extends BaseUserTypeDTO {}