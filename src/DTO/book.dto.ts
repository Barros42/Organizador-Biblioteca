import { IsNotEmpty, ValidateNested, IsNumber, IsString, MinLength, MaxLength, IsPositive, ArrayMinSize, IsObject, IsNotEmptyObject } from 'class-validator';
import { AuthorDTO } from './author.dto';
import { Type } from 'class-transformer';

export class BookDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    readonly name : string;

    @IsNotEmpty()
    @ValidateNested({ each : true})
    @Type(() => AuthorDTO)
    @ArrayMinSize(1)
    @IsNotEmptyObject({ each: true})
    readonly author: AuthorDTO[];

    @IsNotEmpty()
    @IsString()
    readonly language: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly releaseYear: number;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    readonly publisher: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly pages: number;

}