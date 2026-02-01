import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { AdminAuthGuard } from './guards/admin-auth.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') || '1d' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AdminController],
    providers: [AdminService, AdminAuthGuard],
    exports: [AdminService, AdminAuthGuard, JwtModule],
})
export class AdminModule { }
