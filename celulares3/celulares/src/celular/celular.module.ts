import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CelularEntity} from "./celular.entity";
import {CelularController} from "./celular.controller";
import {CelularService} from "./celular.service";
import {FabricanteService} from "../fabricante/fabricante.service";
import {FabricanteController} from "../fabricante/fabricante.controller";
import {FabricanteEntity} from "../fabricante/fabricante.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature(
            [CelularEntity],
            'default'
        ),
        TypeOrmModule.forFeature(
            [FabricanteEntity],
            'default'
        )
    ],
    controllers: [ // Controladores
        CelularController,
        FabricanteController
    ],
    providers: [ // Servicios DECLARADOS
        CelularService,
        FabricanteService
    ],
    exports: [ // Servicios EXPORTADOS

    ],
})
export class CelularModule{

}