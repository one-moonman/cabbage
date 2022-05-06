import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVariantDto {
    @ApiProperty({
        example: 'Summer flip-flops for women S'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'S'
    })
    @IsString()
    @IsNotEmpty()
    slug: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @ApiProperty({
        description: 'id for many-to-one ref'
    })
    @IsString()
    @IsNotEmpty()
    product: string;

    @ApiProperty({
        description: 'id for many-to-one ref'
    })
    @IsString()
    @IsNotEmpty()
    category: string;
}
