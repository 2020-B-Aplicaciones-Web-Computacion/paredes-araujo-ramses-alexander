import {BadRequestException, Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {FabricanteService} from "./fabricante.service";
import {FindConditions, FindManyOptions, Like} from "typeorm";
import {FabricanteEntity} from "./fabricante.entity";
import {FormularioFabricanteDto} from "../dto/formulario-fabricante.dto";
import {validate} from "class-validator";

@Controller('fabricante')
export class FabricanteController{
    constructor(
        private _fabricanteService: FabricanteService
    ) {
    }

    @Get('crear-fabricante')
    crearFabricanteVista(
        @Res()
            response,
    ) {
        response.render('fabricante/crearFab')
    }

    @Post('crear-fabricante')
    async crearFabricante(
        @Body() parametrosCuerpo,
        @Res() response,
    ){

        const dtoFormularioFabricante = new FormularioFabricanteDto();
        dtoFormularioFabricante.nombre      = parametrosCuerpo.nombre
        dtoFormularioFabricante.pais        = parametrosCuerpo.pais
        dtoFormularioFabricante.ubicacion   = parametrosCuerpo.ubicacion
        dtoFormularioFabricante.correo = parametrosCuerpo.correo

        const errores = await validate(dtoFormularioFabricante);

        if(errores.length>0){
            console.error(JSON.stringify(errores))
            console.error(errores.toString())
            //throw new BadRequestException('No envia correctamente los parametros')
            response.redirect('/fabricante/fabricantes?mensaje=' + "Error al crear el fabricante: " +
                "" + errores.toString());
        }else{
            const respuesta = await this._fabricanteService.fabricanteEntity.save({
                nombre: parametrosCuerpo.nombre,
                pais: parametrosCuerpo.pais,
                ubicacion: parametrosCuerpo.ubicacion,
                correo: parametrosCuerpo.correo,
            });
            response.redirect('/fabricante/fabricantes?mensaje=Se creo el fabricante ' + parametrosCuerpo.nombre);
            return 'ok';
        }
    }



    @Post('')
    crearFabricantePost(
        @Body()
            parametrosCuerpo
    ) {
        return this._fabricanteService.fabricanteEntity.save({
            nombre: parametrosCuerpo.nombre,
            pais: parametrosCuerpo.pais,
            ubicacion: parametrosCuerpo.ubicacion,
            correo: parametrosCuerpo.correo
        });
    }

    @Get('fabricantes')
    async obtenerFabricantes(
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
        let consultaWhereOR: FindConditions<FabricanteEntity>[] = [
            {
                nombre: Like(
                    parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'
                ),
            }, // OR
            {
                ubicacion: Like(parametrosConsulta.busqueda ? parametrosConsulta.busqueda : '%%'),
                // estado:'SOLTERO' // Cuando se repiten en los objetos es un AND
            }
        ];
        let consulta: FindManyOptions<FabricanteEntity> = {
            where: consultaWhereOR,
            take: take,
            skip: skip,
            order: {
                id: order === 'ASC' ? 'ASC' : 'DESC',
            }
        };

        let datos = await this._fabricanteService.fabricanteEntity.findAndCount(consulta);
        response.render('fabricante/fabricantes', {
            datos: datos,
            parametrosConsulta: parametrosConsulta,
            //page:this.page
        })

    }
    @Get('eliminar-fabricante')
    async eliminarFabricante(
        @Query()
            parametrosConsulta,
        @Res()
            response

    ){
        await this._fabricanteService.fabricanteEntity.delete({
            id:parametrosConsulta.id
        })
        response.redirect('fabricantes?mensaje=Se elimino el fabricante')
    }


    @Get('editar-fabricante')
    async editarFabricanteVista(
        @Query()
            parametrosConsulta,
        @Res()
            response,
    ) {

        let consultaWhereOR: FindConditions<FabricanteEntity>[] = [
            {
                id: Like(
                    parametrosConsulta.id ? parametrosConsulta.id : '%'
                ),
            }
        ];

        let consulta: FindManyOptions<FabricanteEntity> = {
            where: consultaWhereOR,
            take: 1
        }

        let datos = await this._fabricanteService.fabricanteEntity.findAndCount(consulta);
        response.render('fabricante/editarFab',{
            fabricante:datos[0],
            parametrosConsulta:parametrosConsulta })
    }

    @Post('editar-fabricante')
    async editarFabricante(
        @Query()
            parametrosConsulta,
        @Body() parametrosCuerpo,
        @Res() response,
    ){

        const dtoFormularioFabricante = new FormularioFabricanteDto();
        dtoFormularioFabricante.nombre      = parametrosCuerpo.nombre
        dtoFormularioFabricante.pais        = parametrosCuerpo.pais
        dtoFormularioFabricante.ubicacion   = parametrosCuerpo.ubicacion
        dtoFormularioFabricante.correo = parametrosCuerpo.correo

        const errores = await validate(dtoFormularioFabricante);

        if(errores.length>0){
            console.error(JSON.stringify(errores))
            console.error(errores.toString())
            //throw new BadRequestException('No envia correctamente los parametros')
            response.redirect('/fabricante/fabricantes?mensaje=' +"Error al editar el fabicante: " +
                "\n"+ errores.toString());
        }else{
            const respuesta = await this._fabricanteService.fabricanteEntity.update({
                id: parametrosConsulta.id
            },{
                nombre: parametrosCuerpo.nombre,
                pais: parametrosCuerpo.pais,
                ubicacion: parametrosCuerpo.ubicacion,
                correo: parametrosCuerpo.correo,
            });
            response.redirect('/fabricante/fabricantes?mensaje=Se edito el fabricante: ' + parametrosCuerpo.nombre)

        }

    }



}
