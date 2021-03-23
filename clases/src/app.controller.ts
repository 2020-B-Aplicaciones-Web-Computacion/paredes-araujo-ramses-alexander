import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    Param, Post,
    Query,
    Req,
    Session,
} from '@nestjs/common';

import {AppService} from './app.service';
import { FormularioCrearDto } from './dto/formulario-crear.dto';
import { validate } from 'class-validator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Post('validacion-formulario')
    validacionFormulario(
      @Body parametrosCuerpo
    ){
        const dtoFormulario = new FormularioCrearDto();
        dtoFormulario.nombre = parametrosCuerpo.nombre;;
        dtoFormulario.cedula = parametrosCuerpo.cedula;;
        dtoFormulario.correo = parametrosCuerpo.correo;;
        dtoFormulario.edad = parametrosCuerpo.edad;
        dtoFormulario.soltero = parametrosCuerpo.soltero;
        const errores = await validate(dtoFormulario);
        if(errores.length>0){
            console.error(JSON.stringify(errores));
            console.error(errores.toString());
            throw new BadRequestException('asdfasd');
        }else{
            return 'ok';
        }
    }


    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('login')
    login(
        @Session() session,
        @Query() parametrosConsulta
    ): string {
        if (parametrosConsulta.nombre && parametrosConsulta.apellido) {
            session.usuario = {
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
            }
            if(parametrosConsulta.apellido === 'Eguez'){
                session.usuario.esAdministrador = true;
            }
            return 'Se logeo el usuario';
        } else {
            throw new BadRequestException('NO ENVIA NOMBRE Y APELLIDO'); // 400
        }
    }

    @Get('quien-soy')
    quienSoy(
        @Session() session,
    ): string {
        if (session.usuario) {
            return session.usuario.nombre + ' ' + session.usuario.apellido;
        } else {
            return 'No te haz logeado';
        }
    }

    @Get('protegido')
    protegido(
        @Session() session,
    ): string {
        if (session.usuario) {
            if (session.usuario.esAdministrador) {
                return 'CONTENIDO SUPER OCULTO'
            } else {
                throw new ForbiddenException('No tienes rol Admin');
            }
        } else {
            throw new ForbiddenException('No tienes rol Admin');
        }
    }

    @Get('logout')
    logout(
        @Session() session,
        @Req() request
    ): string {
        session.usuario = undefined;
        request.session.destroy();
        return 'Gracias por visitarnos';
    }
}

// Clases - TYPESCRIPT
/**
 abstract class Nombre {
    public nombrePropiedad?: string; // undefined
    private apellidoPropiedad: string = 'Eguez';
    protected edad = 1; // number (Duck Typing)
    static comun: number = 10;

    propiedadPublica: string;

    constructor(
        propiedadPublicaParametro: string, // parametro
        public propiedadRapido: string, // transforma una propiedad
    ) {
        this.propiedadPublica = propiedadPublicaParametro;
        // this.propiedadPublicaParametro ERROR
        // this.propiedadRapido; OK
    }

    public funcionPublica(parametroString: string): void {
        // no hay return = undefined
    }

    private funcionPrivada(parametroString: string, // ? = puede ser undefined
                           parametroNumber?: number)  { // omitir :void (defecto)
        // no hay return = undefined
    }

    protected funcionPublica(): number {
        return 1;
    }

    static funcionEstatica(): string {
        return 'string';
    }

}
 */
// VARIABLES PRIMITIVAS

// MUTABLES (REASIGNAR "=")
// var variableUno

/*
let variableDos = 3;
variableDos = 1; // OK
// INMUTABLES (NO PUEDEN SER REASIGNADAS "=")
const variableTres = 2;
variableTres = 1; // NO OK
*/

// Tipos de variables

/*
const texto: string = '';
const textoConComillasSimples: string = '';
const numeroEntero: number = 1;
const numeroFlotante: number = 1.2;
const soyEstudiante: boolean = true; // false
const fecha: Date = new Date();
const noDefinido = undefined;
const noHayNada = null;

class Usuario {
    constructor(
        public nombre: string,
        public apellido: string
    ) {
    }
}

const usuario: Usuario = new Usuario('Adrian', 'Eguez');
usuario.nombre = 'Vicente';
usuario.apellido = 'Sarzosa';

interface UsuarioInterface {
    nombre: string;
    apellido: string;
    edad?: number; // ? => Opcional // Valor por defecto es undefined
}

let objetoUsuario: UsuarioInterface = {
    nombre: 'Adrian',
    apellido: 'Eguez'
};
objetoUsuario.nombre;
objetoUsuario.apellido;
objetoUsuario.edad;
console.log(usuario);
console.log(objetoUsuario);

// PUNTEROS REFERENCIAS

// PRIMITIVAS
let edadAntigua = 22;
let otraEdad = edadAntigua; // VALOR
otraEdad = 60; // edadAntigua = 22; OK

// Objeto
let objetoEdad = {
    edad: 22,
};
let otraEdadObjeto = objetoEdad; // REFERENCIA
otraEdadObjeto.edad = 60;
console.log('objetoEdad', objetoEdad)
console.log('otraEdadObjeto', otraEdadObjeto)
objetoEdad.edad = 35;
console.log('objetoEdad', objetoEdad)
console.log('otraEdadObjeto', otraEdadObjeto)
let otraEdadObjetoClonado = {...objetoEdad}; // Clonación
otraEdadObjetoClonado.edad = 60;
console.log('objetoEdad', objetoEdad)
console.log('otraEdadObjetoClonado', otraEdadObjetoClonado)
objetoEdad.edad = 40;
console.log('objetoEdad', objetoEdad)
console.log('otraEdadObjetoClonado', otraEdadObjetoClonado)

// Arreglos

const arregloTodo = [1, '', true, null, new Date()];
const arregloNumeros: number[] = [1, 2, 3, 4, 5];
const arregloNumerosClonado: number[] = [...arregloNumeros];

const indice = arregloNumeros.findIndex(
    (numero) => { // Funcion Anonima xq no tiene nombre
        const elValorEsIgualAtres: boolean = numero === 3;
        return elValorEsIgualAtres  // Condicion -> boolean
    },
    // function () { -> Funcion Anonima xq no tiene nombre
    //
    // }
);
arregloNumeros[indice] = 6

// agregar al final
arregloNumeros.push(6)
// agregar al principio
arregloNumeros.unshift(0)
console.log(arregloNumeros);


// CONDICIONES -> Truty y Falsy

if (0) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
if (1) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
if (-1) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
if ("") {
    console.log('Truty');
} else {
    console.log('Falsy');
}
if ("a") {
    console.log('Truty');
} else {
    console.log('Falsy');
}

if ({}) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
if ({a:1}) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
if ([]) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
if ([1]) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
if (null) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
if (undefined) {
    console.log('Truty');
} else {
    console.log('Falsy');
}
*/
