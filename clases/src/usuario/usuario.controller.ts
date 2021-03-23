import {Controller, Get, Header, HttpCode, Req, Res, Headers, Post, Param, Body, Query} from '@nestjs/common';
import {UsuarioService} from './usuario.service';
import {FindConditions, FindManyOptions, Like} from 'typeorm';
import {UsuarioEntity} from './usuario.entity';

@Controller('usuario')
export class UsuarioController {

    constructor( // Inyectando Dependencias (Servicios)
        private _usuarioService: UsuarioService,
    ) {
    }

    @Get('crear-usuario')
    crearUsuarioVista(
        @Res()
        response,
    ){
        response.render('usuarios/crear');
    }

    @Post('crear-usuario')
    async crearUsuarioDesdeVista(
        @Body() parametrosCuerpo,
        @Res() response,
    ){
       const respuesta = await this._usuarioService.usuarioEntity.save({
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        });
       response.redirect('/usuario/usuarios?mensaje=Se creo el usuario ' + parametrosCuerpo.nombre)
    }







    @Post('')
    crearUsuario(
        @Body()
            parametrosCuerpo
    ) {
        return this._usuarioService.usuarioEntity.save({
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido
        });
    }

    @Get('usuarios')
    async obtenerUsuarios(
        @Query()
            parametrosConsulta,
        @Res()
            response
    ) {
        let take = 10; // dame solo 10 registros
        let skip = 0; // me salto 0 registros
        let order = 'ASC'; // me salto 0 registros
        if (parametrosConsulta.skip) {
            skip = parametrosConsulta.skip;
        }
        if (parametrosConsulta.take) {
            take = parametrosConsulta.take
        }
        if (parametrosConsulta.order) {
            order = parametrosConsulta.order as 'ASC' | 'DESC';
        }

        let consultaWhereAND: FindConditions<UsuarioEntity>[] = [
            {
                id: 4, // and
                nombre: 'Carlos' // and ....
            }
        ];
        // WHERE usuario.id = 4 AND usuario.nombre = 'Carlos'
        let consultaWhereOR: FindConditions<UsuarioEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
                // estado:'SOLTERO' // Cuando se repiten en los objetos es un AND
            }, // OR
            {
                apellido: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
                // estado:'SOLTERO' // Cuando se repiten en los objetos es un AND
            }
        ];
        // WHERE (usuario.nombre = 'Carlos' AND usuario.estado = 'SOLTERO') OR
        // (usuario.apellido LIKE '%Ca%' AND usuario.estado = 'SOLTERO')
        let consulta: FindManyOptions<UsuarioEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC',
            }
        };

        let datos = await this._usuarioService.usuarioEntity.findAndCount(consulta);
        response.render('inicio', {
            datos: datos,
            parametrosConsulta: parametrosConsulta,
        })

    }


    @Get('hola')
    @HttpCode(200)
    @Header('Cache-Control', 'none')
    @Header('EPN', 'SISTEMAS')
    hola(
        @Req()
            request,
        @Headers()
            headers,
        // @Res()
        // response // Ustedes deben devolver la respuesta
    ) {
        // response.send('HOLA DESDE SEND')
        console.log(headers);
        // return 'Hola mundo http';
        // return {
        //     nombre:'Adrian'
        // }
        // return '<xml>Hola Mundo</xml>'
        return '<h1>HOLA MUNDO</h1> <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Polit%C3%A9cnica_Nacional.png" alt="">'
    }

    @Post('parametros-ruta/:numeroUno/:numeroDos')
    parametrosRuta(
        @Param()
            parametrosRuta,
        @Res({passthrough: true})
            response
    ) {
        console.log(parametrosRuta);
        response.header('nueva-header', 'otro valor')
        return 'ok';
    }

    @Get('setear-nombre/:nombre')
    setearNombre(
        @Param()
            parametrosRuta,
        @Req()
            request,
        @Res({passthrough: true})
            response,
    ) {
        console.log(request.cookies); // valor de todas las cookies
        // request.cookies.nombreUsuario // Valor de una cookie en especifico
        response.cookie('nombreUsuario', parametrosRuta.nombre)
        return 'Cookie con nombre ' + parametrosRuta.nombre + ' seteada'; // con passthrough
        // response.send('Cookie con nombre ' + parametrosRuta.nombre + ' seteada') ; // sin passthrough
    }


}
