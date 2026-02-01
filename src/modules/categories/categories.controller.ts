import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { AdminAuthGuard } from '../../modules/admin/guards/admin-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Post()
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @ApiOperation({ summary: 'Create a new category (Admin only)' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'List all categories' })
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category details by ID' })
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id);
    }

    @Patch(':id')
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @ApiOperation({ summary: 'Update a category (Admin only)' })
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Get('stats')
    @ApiOperation({ summary: 'Get category statistics (Game counts)' })
    getStats() {
        return this.categoriesService.getStats();
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AdminAuthGuard)
    @ApiOperation({ summary: 'Delete a category (Admin only)' })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}
