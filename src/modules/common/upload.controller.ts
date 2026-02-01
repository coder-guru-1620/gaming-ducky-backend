import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = uuidv4();
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new HttpException('File not provided', HttpStatus.BAD_REQUEST);
        }
        // Return the relative URL
        return {
            url: `/uploads/${file.filename}`,
        };
    }
}
