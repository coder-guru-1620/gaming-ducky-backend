import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { GamesModule } from './modules/games/games.module';
import { UploadController } from './modules/common/upload.controller';
import { databaseConfig } from './config/database.config';

import { PagesModule } from './modules/pages/pages.module';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [databaseConfig],
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads',
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => configService.get('database'),
            inject: [ConfigService],
        }),
        UsersModule,
        AuthModule,
        AdminModule,
        CategoriesModule,
        GamesModule,
        PagesModule,
    ],
    controllers: [AppController, UploadController],
    providers: [],
})
export class AppModule { }
