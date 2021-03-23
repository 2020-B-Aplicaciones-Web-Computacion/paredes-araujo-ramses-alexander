import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CelularEntity} from "../celular/celular.entity";

@Entity('EPN_FABRICANTE')
export class FabricanteEntity{
    @PrimaryGeneratedColumn()
    id:number
    @Column({
        type:   'varchar',
        length: 100,
        nullable:false,
        name:   'FAB_NOMBRE'
    })
    nombre:string

    @Column({
        type:   'varchar',
        length: 100,
        nullable:false,
        name:   'FAB_PAIS'
    })
    pais:string

    @Column({
        type:   'varchar',
        length: 100,
        nullable:false,
        name:   'FAB_UBICACION'
    })
    ubicacion:string

    @Column({
        type:   'varchar',
        nullable:false,
        name:   'FAB_CORREO'
    })
    correo:string

    @OneToMany(
        type =>CelularEntity,
        celular => celular.fkFabricante)
    celulares: CelularEntity[];
}