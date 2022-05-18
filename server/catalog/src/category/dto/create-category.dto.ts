import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        example: 'Summer flip flops'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'summer-flip-flops',
        description: 'dash separated slug'
    })
    @IsString()
    @IsNotEmpty()
    slug: string;
}
