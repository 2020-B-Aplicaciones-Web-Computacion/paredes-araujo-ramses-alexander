import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {FabricanteModule} from "./fabricante/fabricante.module";
import {CelularModule} from "./celular/celular.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FabricanteEntity} from "./fabricante/fabricante.entity";
import {CelularEntity} from "./celular/celular.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(
        {
          name:'default',
          type:'mysql',
          port:3010,
          username: 'root',
          password:'123456789',
          database: 'web1',
          dropSchema: false,//Elimina toda la base de datos
          synchronize:true,//crea y modifica las tablas
          entities:[
              FabricanteEntity,
              CelularEntity
          ]
        }),
    FabricanteModule,
    CelularModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
