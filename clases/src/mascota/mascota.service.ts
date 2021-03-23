import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UsuarioEntity} from '../usuario/usuario.entity';
import {Repository} from 'typeorm';
import {MascotaEntity} from './mascota.entity';

@Injectable()
export class MascotaService {
    constructor( // Inyectar Dependencias
        @InjectRepository(MascotaEntity)
        public mascotaEntity:Repository<MascotaEntity>
    ) {
    }
}
