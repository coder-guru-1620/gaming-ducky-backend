import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto, UpdatePageDto } from './dto/create-page.dto';
import { AdminAuthGuard } from '../../modules/admin/guards/admin-auth.guard';

@Controller('pages')
export class PagesController {
    constructor(private readonly pagesService: PagesService) { }

    @Post()
    @UseGuards(AdminAuthGuard)
    create(@Body() createPageDto: CreatePageDto) {
        return this.pagesService.create(createPageDto);
    }

    @Get()
    findAll() {
        return this.pagesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pagesService.findOne(id);
    }

    // Public endpoint to fetch by slug, usually needed for frontend
    @Get('slug/:slug')
    findBySlug(@Param('slug') slug: string) {
        return this.pagesService.findBySlug(slug);
    }

    @Patch(':id')
    @UseGuards(AdminAuthGuard)
    update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
        return this.pagesService.update(id, updatePageDto);
    }

    @Delete(':id')
    @UseGuards(AdminAuthGuard)
    remove(@Param('id') id: string) {
        return this.pagesService.remove(id);
    }
}
