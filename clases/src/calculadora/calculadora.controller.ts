import {Controller, Get, Header, Headers, HttpCode, Param, Patch, Post, Put, Req, Res} from "@nestjs/common";


@Controller('calculadora')
export class CalculadoraController{


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
//--------------------------------------------------------------------------------------
    //SUMA
    //http://localhost:3000/calculadora/suma?uno=2&dos=30&nombre=amnesia
    @Get('suma')
    @HttpCode(200)
    suma(
        @Req()
            request,
        @Param()
            params,
        @Res({passthrough:true})
            response
    ){

        const uno:number = +request.query.uno;
        const dos:number = +request.query.dos;
        const resp = uno+dos;
        const cookiess = request.cookies;
        const name:string= request.query.nombre;

        console.log(cookiess);

        console.log(cookiess[name]);

        if(cookiess[name]  == undefined){
            //La cookie es nueva
            //verificar si el resultado es menor de cien para que se presenten 2 casos
            //1 se inicia con 100 y se presenta la resta
            //2 si el resultado es mayor a 100 se muestra el con cuanto gano y se llena con 100 otravez
            if(resp>=100){
                const aux=100-resp;
                response.cookie(name,100);
                /*response.send("Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la suma es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.");*/
                return "Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la suma es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.";

            }else{
                const aux=100-resp;
                response.cookie(name,aux);
                /*response.send("Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la suma es: "+resp
                    +"\nEl valor almacenado en la cookie de "+name+" sera de: "+aux
                    );*/
                return "Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la suma es: "+resp
                    +"\nEl valor almacenado en la cookie de "+name+" sera de: "+aux;
            }

        }else{
            //La cookie ya existe
            const aux =  cookiess[name]-resp;
            if (aux<=0){
                //Gano, imprimir la diferencia y resetear el valor a cero
                response.cookie(name,100);
                /*response.send("Cookie para "+name+" existe con un valor de: "+cookiess[name] +
                    "\nEl valor de la suma es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.");*/
                return "Cookie para "+name+" existe con un valor de: "+cookiess[name] +
                    "\nEl valor de la suma es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.";
            }else{
                //El valor de la cookie al restarle la respuesta aun es mayor que cero
                response.cookie(name,aux)
                /*response.send("Cookie para "+name+" existe con un valor de: "+cookiess[name]  +
                    "\nEl valor de la suma es: "+resp
                    +"\nEl valor actual de su cookie es: "+aux);*/
                return "Cookie para "+name+" existe con un valor de: "+cookiess[name]  +
                    "\nEl valor de la suma es: "+resp
                    +"\nEl valor actual de su cookie es: "+aux;

            }
        }
    }
    //SUMA1
    //http://localhost:3000/calculadora/suma1?uno=2&dos=3
    @Get('suma1')
    @HttpCode(200)
    suma1(
        @Req()
            request,
        @Headers()
            headers,
        @Param()
        params,
        @Res({passthrough:true})
            response
    ){

        const uno:number = +request.query.uno;
        const dos:number = +request.query.dos;
        return uno+dos;
    }

//......................................................................................
//RESTA
    //http://localhost:3000/calculadora/resta?uno=60&dos=30&nombre=amnesia
    @Post('resta')
    @HttpCode(201)
    resta(
        @Req()
            request,
        @Param()
            params,
        @Res({passthrough:true})
            response
    ){

        const uno:number = +request.query.uno;
        const dos:number = +request.query.dos;
        const resp = uno-dos;
        const cookiess = request.cookies;
        const name:string= request.query.nombre;

        console.log(cookiess);

        console.log(cookiess[name]);

        if(cookiess[name]  == undefined){
            //La cookie es nueva
            //verificar si el resultado es menor de cien para que se presenten 2 casos
            //1 se inicia con 100 y se presenta la resta
            //2 si el resultado es mayor a 100 se muestra el con cuanto gano y se llena con 100 otravez
            if(resp>=100){
                const aux=100-resp;
                response.cookie(name,100);
                /*response.send("Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la resta es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.");*/
                return "Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la resta es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.";

            }else{
                const aux=100-resp;
                response.cookie(name,aux);
                /*response.send("Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la resta es: "+resp
                    +"\nEl valor almacenado en la cookie de "+name+" sera de: "+aux
                    );*/
                return "Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la resta es: "+resp
                    +"\nEl valor almacenado en la cookie de "+name+" sera de: "+aux;
            }

        }else{
            //La cookie ya existe
            const aux =  cookiess[name]-resp;
            if (aux<=0){
                //Gano, imprimir la diferencia y resetear el valor a cero
                response.cookie(name,100);
                /*response.send("Cookie para "+name+" existe con un valor de: "+cookiess[name] +
                    "\nEl valor de la suma es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.");*/
                return "Cookie para "+name+" existe con un valor de: "+cookiess[name] +
                    "\nEl valor de la resta es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.";
            }else{
                //El valor de la cookie al restarle la respuesta aun es mayor que cero
                response.cookie(name,aux)
                /*response.send("Cookie para "+name+" existe con un valor de: "+cookiess[name]  +
                    "\nEl valor de la suma es: "+resp
                    +"\nEl valor actual de su cookie es: "+aux);*/
                return "Cookie para "+name+" existe con un valor de: "+cookiess[name]  +
                    "\nEl valor de la resta es: "+resp
                    +"\nEl valor actual de su cookie es: "+aux;

            }
        }
    }


    //resta1
    @Post('resta1')
    @HttpCode(201)
    resta1(
        @Req()
            request,
        @Headers()
            headers,
        @Param()
            params
    ){

        //const uno:number = +request.params.uno;
        //const dos:number = +request.params.dos;
        const uno:number = +request.query.uno;
        const dos:number = +request.query.dos;
        return uno-dos;
    }
//-----------------------------------------------------------------------------------------
    //multiplicacion
    //http://localhost:3000/calculadora/multiplicacion?uno=6&dos=3&nombre=amnesia
    @Put('multiplicacion')
    @HttpCode(200)
    multiplicacion(
        @Req()
            request,
        @Param()
            params,
        @Res({passthrough:true})
            response
    ){

        const uno:number = +request.query.uno;
        const dos:number = +request.query.dos;
        const resp = uno*dos;
        const cookiess = request.cookies;
        const name:string= request.query.nombre;

        console.log(cookiess);

        console.log(cookiess[name]);

        if(cookiess[name]  == undefined){
            //La cookie es nueva
            //verificar si el resultado es menor de cien para que se presenten 2 casos
            //1 se inicia con 100 y se presenta la resta
            //2 si el resultado es mayor a 100 se muestra el con cuanto gano y se llena con 100 otravez
            if(resp>=100){
                const aux=100-resp;
                response.cookie(name,100);
                /*response.send("Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la resta es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.");*/
                return "Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la multiplicacion es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.";

            }else{
                const aux=100-resp;
                response.cookie(name,aux);
                /*response.send("Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la resta es: "+resp
                    +"\nEl valor almacenado en la cookie de "+name+" sera de: "+aux
                    );*/
                return "Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la multiplicacion es: "+resp
                    +"\nEl valor almacenado en la cookie de "+name+" sera de: "+aux;
            }

        }else{
            //La cookie ya existe
            const aux =  cookiess[name]-resp;
            if (aux<=0){
                //Gano, imprimir la diferencia y resetear el valor a cero
                response.cookie(name,100);
                /*response.send("Cookie para "+name+" existe con un valor de: "+cookiess[name] +
                    "\nEl valor de la suma es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.");*/
                return "Cookie para "+name+" existe con un valor de: "+cookiess[name] +
                    "\nEl valor de la multiplicacion es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.";
            }else{
                //El valor de la cookie al restarle la respuesta aun es mayor que cero
                response.cookie(name,aux)
                /*response.send("Cookie para "+name+" existe con un valor de: "+cookiess[name]  +
                    "\nEl valor de la suma es: "+resp
                    +"\nEl valor actual de su cookie es: "+aux);*/
                return "Cookie para "+name+" existe con un valor de: "+cookiess[name]  +
                    "\nEl valor de la multiplicacion es: "+resp
                    +"\nEl valor actual de su cookie es: "+aux;

            }
        }
    }

    //multiplicacion1
    //http://localhost:3000/calculadora/multiplicacion1?uno=4&dos=3
    //http://localhost:3000/calculadora/multiplicacion1?uno=4&dos=5
    @Put('multiplicacion1')
    @HttpCode(200)
    multiplicacion1(
        @Req()
            request,
        @Headers()
            headers,
        @Param()
            params
    ){

        //const uno:number = +request.params.uno;
        //const dos:number = +request.params.dos;
        const uno:number = +request.query.uno;
        const dos:number = +request.query.dos;
        return uno*dos;
    }
//-----------------------------------------------------------------------------------------
    //DIVISION
    @Patch('division')
    @HttpCode(200)
    division(
        @Req()
            request,
        @Param()
            params,
        @Res({passthrough:true})
            response
    ){

        const uno:number = +request.query.uno;
        const dos:number = +request.query.dos;
        const resp = uno/dos;
        const cookiess = request.cookies;
        const name:string= request.query.nombre;

        console.log(cookiess);

        console.log(cookiess[name]);

        if(cookiess[name]  == undefined){
            //La cookie es nueva
            //verificar si el resultado es menor de cien para que se presenten 2 casos
            //1 se inicia con 100 y se presenta la resta
            //2 si el resultado es mayor a 100 se muestra el con cuanto gano y se llena con 100 otravez
            if(resp>=100){
                const aux=100-resp;
                response.cookie(name,100);
                /*response.send("Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la resta es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.");*/
                return "Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la division es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.";

            }else{
                const aux=100-resp;
                response.cookie(name,aux);
                /*response.send("Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la resta es: "+resp
                    +"\nEl valor almacenado en la cookie de "+name+" sera de: "+aux
                    );*/
                return "Cookie para "+name+" no existe, se creara." +
                    "\nEl valor de la division es: "+resp
                    +"\nEl valor almacenado en la cookie de "+name+" sera de: "+aux;
            }

        }else{
            //La cookie ya existe
            const aux =  cookiess[name]-resp;
            if (aux<=0){
                //Gano, imprimir la diferencia y resetear el valor a cero
                response.cookie(name,100);
                /*response.send("Cookie para "+name+" existe con un valor de: "+cookiess[name] +
                    "\nEl valor de la suma es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.");*/
                return "Cookie para "+name+" existe con un valor de: "+cookiess[name] +
                    "\nEl valor de la division es: "+resp
                    +"\n"+name+" gano con un puntaje de: "+aux
                    +"\nSu valor volvera a ser 100.";
            }else{
                //El valor de la cookie al restarle la respuesta aun es mayor que cero
                response.cookie(name,aux)
                /*response.send("Cookie para "+name+" existe con un valor de: "+cookiess[name]  +
                    "\nEl valor de la suma es: "+resp
                    +"\nEl valor actual de su cookie es: "+aux);*/
                return "Cookie para "+name+" existe con un valor de: "+cookiess[name]  +
                    "\nEl valor de la division es: "+resp
                    +"\nEl valor actual de su cookie es: "+aux;

            }
        }
    }


    //division1
    //http://localhost:3000/calculadora/division1?uno=20&dos=2
    @Patch('division1')
    @HttpCode(200)
    division1(
        @Req()
            request,
        @Headers()
            headers,
        @Param()
            params
    ){

        //const uno:number = +request.params.uno;
        //const dos:number = +request.params.dos;
        const uno:number = +request.query.uno;
        const dos:number = +request.query.dos;
        return uno/dos;
    }
//-----------------------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------------------
  /*  @Get('setearNombre')
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

        console.log(cookiess)

        console.log(cookiess[name])

        if(cookiess[name]  == undefined){

            return 'Cookie de '+ name+' no existe, pero ha sido creada con un numero inicial de 100';

        }else{
            cookiess[name]=cookiess[name]-5;
            response.cookie(name,cookiess[name])

            response.send( 'Cookie de '+ name+' existe y tiene el valor de: '+ cookiess[name]);
        }
    }*/


}