import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { Game, GameCategory } from './entities/game.entity';
import { AdminModule } from '../admin/admin.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Game, GameCategory]),
        AdminModule,
    ],
    controllers: [GamesController],
    providers: [GamesService],
})
export class GamesModule { }
