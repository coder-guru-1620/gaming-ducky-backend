import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreatePageDto {
    @ApiProperty({ description: 'The title of the page', example: 'Terms of Service' })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ description: 'The unique slug for the page URL', example: 'terms-of-service' })
    @IsNotEmpty()
    @IsString()
    slug: string;

    @ApiProperty({ description: 'The HTML content of the page', example: '<h1>Terms</h1><p>...</p>' })
    @IsNotEmpty()
    @IsString()
    htmlContent: string;

    @ApiPropertyOptional({ description: 'Whether the page is published', default: false })
    @IsOptional()
    @IsBoolean()
    publishStatus?: boolean;
}

export class UpdatePageDto extends PartialType(CreatePageDto) { }
