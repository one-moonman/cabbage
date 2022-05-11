import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, applyDecorators } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { ProductsService } from 'src/products/products.service';
import { NotFoundInterceptor } from 'src/utils/404.interceptor';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Variant } from './entities/variant.entity';

const VariantResponse = () => applyDecorators(
  ApiOkResponse({ type: Variant }),
  ApiNotFoundResponse(),
  UseInterceptors(new NotFoundInterceptor('Variant Not Found'))
);

@ApiTags('variants')
@Controller('variants')
export class VariantsController {
  constructor(
    private readonly variantsService: VariantsService,
    private readonly productsService: ProductsService
  ) { }

  @Post()
  @ApiBody({ type: CreateVariantDto })
  @ApiCreatedResponse({ type: Variant })
  async create(@Body() createVariantDto: CreateVariantDto) {
    const product = await this.productsService.findById(createVariantDto.product);
    if (!product) throw new Error();
    const variant = await this.variantsService.create(createVariantDto);
    product.variants.push(variant);
    await product.save();
    return variant;
  }

  @Get()
  @ApiOkResponse({ type: Variant })
  async findAll() {
    return this.variantsService.findAll();
  }

  @Get(':id')
  @VariantResponse()
  async findOne(@Param('id') id: string, @Query('taken') taken: number) {
    return this.variantsService.findOne(id, taken);
  }

  @Patch(':id')
  @VariantResponse()
  async update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantsService.update(id, updateVariantDto);
  }

  @Delete(':id')
  @VariantResponse()
  async remove(@Param('id') id: string) {
    return this.variantsService.remove(id);
  }
}
