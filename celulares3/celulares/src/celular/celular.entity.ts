import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FabricanteEntity} from "../fabricante/fabricante.entity";

@Entity('EPN_CELULAR')
export class CelularEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        type:   'varchar',
        length: 100,
        nullable:false,
        name:   'CEL_NOMBRE'
    })
    nombre:string

    @Column({
        type:   'varchar',
        length: 100,
        nullable:false,
        name:   'CEL_MODELO'
    })
    modelo:string

    @Column({
        type:   'varchar',
        length: 100,
        nullable:false,
        name:   'CEL_PROCESADOR'
    })
    procesador:string

    @Column({
        type:   'double',
        nullable:false,
        name:   'CEL_MEMORIA'
    })
    memoria:number

    @ManyToOne(
        type => FabricanteEntity,
        fabricante => fabricante.celulares)
    fkFabricante: FabricanteEntity;
}