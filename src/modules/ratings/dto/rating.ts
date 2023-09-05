import {/* IsBoolean */ IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID, } from 'class-validator'

class BaseRatingDTO {
    @IsNotEmpty()
    @IsNumber()
    rating!: number

    @IsNotEmpty()
    @IsString()
    comentary!: string

    // @IsNotEmpty()
    // @IsUUID('4')
    // UserId!: string

    @IsBoolean()
    isActive?: boolean;

    // @IsNotEmpty()
    // @IsUUID("4")
    // ProviderId!: string;
}

export class CreateRatingDTO extends BaseRatingDTO {}

export class UpdateRatingDTO{
    @IsNotEmpty()
    @IsString()
    id!: string;

    @IsBoolean()
    isActive!: boolean;

    @IsString()
    comentary!: string;

    @IsNotEmpty()
    rating!: number;

}

export class SearchIdRatingDTO{
    @IsNotEmpty()
    @IsUUID('4')
    id!: string;
}