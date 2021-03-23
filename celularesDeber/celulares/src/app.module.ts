import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";

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

          ]
        }
    )

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
