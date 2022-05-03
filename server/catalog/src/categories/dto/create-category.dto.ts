import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'summer-flip-flops' })
    @IsString()
    @IsNotEmpty()
    slug: string;
}
