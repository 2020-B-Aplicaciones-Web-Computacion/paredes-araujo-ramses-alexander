import {Controller, Get, Header, HttpCode, Param, Post, Req, Headers, Res} from '@nestjs/common';
import path from "node:path";


@Controller('usuario')
export class UsuarioController{

    @Get('hola')
    @HttpCode(200)
    @Header('CacheControl','none')
    @Header('EPN','Sistemas')
    hola(
        @Req()
        request,
        @Headers()
        headers
    ){
        console.log(headers)
        //return 'Hola mundo http';
        /*return {
            nombre: 'Ramses'
        }*/
        //return '<xml>Hola Mundo</xml>'
        return '<h1>Hola Mundo HTML</h1><img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Politécnica_Nacional.png"/>'
    }


    @Get('setearNombre')
    @HttpCode(200)
    @Header('CacheControl','none')
    @Header('EPN','Sistemas')
    setearNombre(
        @Param()
            parametrosRuta,
        @Req()
        request,
        @Res({passthrough:true})
        response
    ){
        const cookiess = request.cookies
        const name:string= request.query.nombre

        console.log(cookiess)//valor de la cookie en la peticion
        //request.cookies.nombreUsuario // Valor de una cookie en especifico
        //response.cookie('nombreUsuario',name)
        //response.cookie("a","b","c","d")


        console.log(cookiess[name])

        if(cookiess[name]  == undefined){
            //response.cookie(name,100)
            return 'Cookie de '+ name+' no existe, pero ha sido creada con un numero inicial de 100';

        }else{
            cookiess[name]=cookiess[name]-5;
            response.cookie(name,cookiess[name])
            //return 'Cookie de '+ name+' existe y tiene el valor de: '+ cookiess[name];
            response.send( 'Cookie de '+ name+' existe y tiene el valor de: '+ cookiess[name]);
        }
        //return 'Cookie con nombre '+ request.cookies.ramses +' '; request.cookies['cookieKey']
        // return 'Cookie con nombre '+ request.query.nombre+' seteada'; //con passthrougth
        //response.send('Cookie con nombre '+ parametrosRuta.nombre+'seteada');


        //return '<h1>Hola Mundo HTML</h1><img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Escudo_de_la_Escuela_Politécnica_Nacional.png"/>'
    }

  /*  @Post(path:'parametros-ruta/:numeroUno/:numeroDos')
    parametrosRuta(
        @Param()

    ){

    }*/

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
}