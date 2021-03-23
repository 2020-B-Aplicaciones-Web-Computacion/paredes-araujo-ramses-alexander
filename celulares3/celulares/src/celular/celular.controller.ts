import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {CelularService} from "./celular.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {CelularEntity} from "./celular.entity";
import {FabricanteEntity} from "../fabricante/fabricante.entity";
import {FabricanteService} from "../fabricante/fabricante.service";
import {FormularioFabricanteDto} from "../dto/formulario-fabricante.dto";
import {validate} from "class-validator";
import {FormularioCelularDto} from "../dto/formulario-celular.dto";

@Controller('celular')
export class CelularController{
    constructor(
        private _celularService: CelularService,
        private _fabricanteService: FabricanteService
    ) {

    }



    @Get('celularesFabricante')
    async obtenerCelularesPorFabricante(
        @Query()
            parametrosConsulta,
        @Res()
            response
    ) {
        let take = 5;
        let skip = 0;
        let order = 'ASC';

        if (parametrosConsulta.order) {
            order = parametrosConsulta.order;
        }

        let nombreFab = parametrosConsulta.nombreFab


        let consultaWhereAND: FindConditions<CelularEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
                fkFabricante: Like(
                    parametrosConsulta.idFab ? parametrosConsulta.idFab: '%'
                ),
            }
        ]

        let consulta: FindManyOptions<CelularEntity> = {
            where: consultaWhereAND,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }

        let datos = await this._celularService.celularEntity.findAndCount(consulta);
        response.render('celular/celularesFabricante' , {
            datos: datos,
            parametrosConsulta: parametrosConsulta,
            nombreFab:nombreFab,
            idFab:parametrosConsulta.idFab

        })
    }

    @Get('celulares')
    async obtenerCelulares(
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

        // WHERE usuario.id = 4 AND usuario.nombre = 'Carlos'
        let consultaWhereOR: FindConditions<CelularEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
            }
        ];

        let consulta: FindManyOptions<CelularEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }

        let datosCelulares = await this._celularService.celularEntity.findAndCount(consulta);
        let datosFabricante = await this._fabricanteService.fabricanteEntity.findAndCount()
        response.render('celular/celulares' , {
            datosCelulares: datosCelulares,
            parametrosConsulta: parametrosConsulta,
            datosFabricante:datosFabricante

        })
    }
    /*    @Get('celulares')
    async obtenerCelulares(
        @Query()
            parametrosConsulta,
        @Res()
            response
    ) {
        let take = 5;
        let skip = 0;
        let order = 'ASC';

        if (parametrosConsulta.order) {
            order = parametrosConsulta.order;
        }


        this.fkFabricante = parametrosConsulta.id;
        let nombreFab = parametrosConsulta.nombreFab


        let consultaWhereAND: FindConditions<CelularEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
                fkFabricante: Like(
                    parametrosConsulta.id ? parametrosConsulta.id: '%'
                ),
            }
        ]

        let consulta: FindManyOptions<CelularEntity> = {
            where: consultaWhereAND,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC'
            }
        }

        let datos = await this._celularService.celularEntity.findAndCount(consulta);
        response.render('celular/celularesFabricante' , {
            datos: datos,
            parametrosConsulta: parametrosConsulta,
            nombreFab:nombreFab

        })
    }*/

    @Get('editar-celular')
    async editarCelularVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ) {

        let consultaWhereOR: FindConditions<CelularEntity>[] = [
            {
                id: Like(
                    parametrosConsulta.id ? parametrosConsulta.id : '%'
                ),
            }
        ];

        let consulta: FindManyOptions<CelularEntity> = {
            where: consultaWhereOR,
            take: 1
        }
        //-------------------------------------------------------------------------------------













        //-------------------------------------------------------------------------------------

        let datos = await this._celularService.celularEntity.findAndCount(consulta);
        response.render('celular/editarCel',{
            celular:datos[0],
            parametrosConsulta:parametrosConsulta,
            idFab:parametrosConsulta.idFab,
            nombreFab:parametrosConsulta.nombreFab
        })
    }

    @Post('editar-celular')
    async editarCelular(
        @Query()
            parametrosConsulta,
        @Body() parametrosCuerpo,
        @Res() response,
    ){
        //--------------------------------------------


        const dtoFormularioCelular= new FormularioCelularDto();
        dtoFormularioCelular.nombre     = parametrosCuerpo.nombre
        dtoFormularioCelular.modelo     = parametrosCuerpo.modelo
        dtoFormularioCelular.procesador = parametrosCuerpo.procesador
        dtoFormularioCelular.memoria    = parseFloat(parametrosCuerpo.memoria)

        const errores = await validate(dtoFormularioCelular);

        if(errores.length>0){
            console.error(JSON.stringify(errores))
            console.error(errores.toString())
            //throw new BadRequestException('No envia correctamente los parametros')
            if(parametrosConsulta.nombreFab!=null){
                response.redirect('/celular/celularesFabricante?idFab='+parametrosConsulta.idFab+'&nombreFab='+parametrosConsulta.nombreFab+'&mensaje=' +"Error al editar el celular: " +
                    "\n"+ errores.toString());
                //response.redirect('/inicio')

            }else{
                response.redirect('/celular/celulares?mensaje=' +"Error al editar el celular: " +
                    "\n"+ errores.toString());
            }


        }else{
            const respuesta = await this._celularService.celularEntity.update({
                id: parametrosConsulta.id
            },{
                nombre: parametrosCuerpo.nombre,
                modelo: parametrosCuerpo.modelo,
                procesador: parametrosCuerpo.procesador,
                memoria: parametrosCuerpo.memoria,
            });
            if(parametrosConsulta.nombreFab!=null){
                response.redirect('/celular/celularesFabricante?idFab='+parametrosConsulta.idFab+'&nombreFab='+parametrosConsulta.nombreFab+'&mensaje=Se edito el celular ' + parametrosCuerpo.nombre)
                //response.redirect('/inicio')

            }else{
                response.redirect('/celular/celulares?mensaje=Se edito el celular ' + parametrosCuerpo.nombre)
            }


        }
            //---------------------------------------------

    }

    @Get('eliminar-celular')
    async eliminarCelular(
        @Query()
            parametrosConsulta,
        @Res()
            response

    ){
        await this._celularService.celularEntity.delete({
            id:parametrosConsulta.id
        })

        if(parametrosConsulta.nombreFab!=null){
            response.redirect('/celular/celularesFabricante?idFab='+parametrosConsulta.idFab+'&nombreFab='+parametrosConsulta.nombreFab+'&mensaje=Se elimino el celular ')
            //response.redirect('/inicio')
        }else{
            response.redirect('celulares?mensaje=Se elimino el fabricante')
        }
    }
    //-------------------------------------------------------------------------------------------------------------

    @Get('crear-celular')
    crearCelularVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ) {
        let nombre = parametrosConsulta.nombreFab
        response.render('celular/crearCel',{
            fkFabricante:parametrosConsulta.fkFabricante,
            nombre:nombre
        })
    }

    @Post('crear-celular')
    async crearFabricante(
        @Query()
            parametrosConsulta,
        @Body() parametrosCuerpo,
        @Res() response,
    ){
        //      fkFabricante
        const dtoFormularioCelular= new FormularioCelularDto();
        dtoFormularioCelular.nombre     = parametrosCuerpo.nombre
        dtoFormularioCelular.modelo     = parametrosCuerpo.modelo
        dtoFormularioCelular.procesador = parametrosCuerpo.procesador
        dtoFormularioCelular.memoria    = parseFloat(parametrosCuerpo.memoria)

        const errores = await validate(dtoFormularioCelular);

        if(errores.length>0) {
            console.error(JSON.stringify(errores))
            console.error(errores.toString())
            response.redirect('/celular/celularesFabricante?idFab='+parametrosCuerpo.fkFabricante+'&nombreFab='+parametrosConsulta.nombreFab+'&mensaje='+
                'Error al crear celular: '+errores.toString())
        }else{
            const respuesta = await this._celularService.celularEntity.save({
                nombre: parametrosCuerpo.nombre,
                modelo: parametrosCuerpo.modelo,
                procesador: parametrosCuerpo.procesador,
                memoria: parametrosCuerpo.memoria,
                fkFabricante:parametrosCuerpo.fkFabricante
            });
            response.redirect('/celular/celularesFabricante?idFab='+parametrosCuerpo.fkFabricante+'&nombreFab='+parametrosConsulta.nombreFab+'&mensaje=Se creo el celular '+parametrosCuerpo.nombre)
        }

    }


}