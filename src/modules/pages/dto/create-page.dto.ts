import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePageDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    slug: string;

    @IsNotEmpty()
    @IsString()
    htmlContent: string;

    @IsOptional()
    @IsBoolean()
    publishStatus?: boolean;
}

export class UpdatePageDto extends CreatePageDto { }
