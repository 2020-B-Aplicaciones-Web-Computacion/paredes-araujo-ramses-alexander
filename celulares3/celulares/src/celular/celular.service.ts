import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CelularEntity} from "./celular.entity";
import {Repository} from "typeorm";
import {FabricanteEntity} from "../fabricante/fabricante.entity";

@Injectable()
export class CelularService{
    constructor(
        @InjectRepository(CelularEntity)
        public celularEntity:Repository<CelularEntity>,

        @InjectRepository(CelularEntity)
        public fabricanteEntity:Repository<FabricanteEntity>

    ) {
    }
}