import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { AdminModule } from '../admin/admin.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category]),
        AdminModule, // For AuthGuard
    ],
    controllers: [CategoriesController],
    providers: [CategoriesService],
    exports: [CategoriesService],
})
export class CategoriesModule { }
