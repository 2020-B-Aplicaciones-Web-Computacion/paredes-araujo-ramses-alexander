import {Column} from "typeorm";
import {IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

export class FormularioFabricanteDto{

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre:string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    pais:string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    ubicacion:string

    @IsNotEmpty()
    @IsEmail()
    correo:string

}