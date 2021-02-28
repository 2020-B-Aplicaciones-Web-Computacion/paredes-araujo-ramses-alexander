import {Module} from "@nestjs/common";
import {CalculadoraController} from "./calculadora.controller";

@Module({
    imports: [ //Modulos

    ],
    controllers: [ // controladores
        CalculadoraController
    ],
    providers: [ //Servicios DECLARADOS

    ],
    exports:[ //Servicios EXPORTADOS

    ]
})

export class CalculadoraModule{

}