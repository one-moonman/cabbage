import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        example: 'Summer flip flops for woman'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'woman'
    })
    @IsString()
    @IsNotEmpty()
    slug: string;

    @ApiPropertyOptional()
    @IsNumber()
    price?: number;

    @ApiProperty({
        description: 'category id for many to one ref'
    })
    @IsString()
    @IsNotEmpty()
    category: string;
}
