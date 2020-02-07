import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class AuthorDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly surname : string;

}