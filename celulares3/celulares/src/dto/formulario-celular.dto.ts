import {Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FabricanteEntity} from "../fabricante/fabricante.entity";
import {IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength} from "class-validator";


export class FormularioCelularDto{


    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nombre:string

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    modelo:string


    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    procesador:string


    @IsNumber()
    @IsPositive()
    memoria:number


}