import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './entities/page.entity';
import { CreatePageDto, UpdatePageDto } from './dto/create-page.dto';

@Injectable()
export class PagesService {
    constructor(
        @InjectRepository(Page)
        private pagesRepository: Repository<Page>,
    ) { }

    async create(createPageDto: CreatePageDto): Promise<Page> {
        const existing = await this.pagesRepository.findOne({ where: { slug: createPageDto.slug } });
        if (existing) {
            throw new ConflictException('Slug already exists');
        }
        const page = this.pagesRepository.create(createPageDto);
        return this.pagesRepository.save(page);
    }

    async findAll(): Promise<Page[]> {
        return this.pagesRepository.find();
    }

    async findOne(id: string): Promise<Page> {
        const page = await this.pagesRepository.findOne({ where: { id } });
        if (!page) throw new NotFoundException('Page not found');
        return page;
    }

    async findBySlug(slug: string): Promise<Page> {
        const page = await this.pagesRepository.findOne({ where: { slug } });
        if (!page) throw new NotFoundException('Page not found');
        return page;
    }

    async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
        const page = await this.findOne(id);

        if (updatePageDto.slug && updatePageDto.slug !== page.slug) {
            const existing = await this.pagesRepository.findOne({ where: { slug: updatePageDto.slug } });
            if (existing) {
                throw new ConflictException('Slug already exists');
            }
        }

        Object.assign(page, updatePageDto);
        return this.pagesRepository.save(page);
    }

    async remove(id: string): Promise<void> {
        const result = await this.pagesRepository.delete(id);
        if (result.affected === 0) throw new NotFoundException('Page not found');
    }
}
