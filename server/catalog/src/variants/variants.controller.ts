import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { ProductsService } from 'src/products/products.service';
import { NotFoundInterceptor } from 'src/interceptors/NotFound.interceptor';

@Controller('variants')
export class VariantsController {
  constructor(
    private readonly variantsService: VariantsService,
    private readonly productsService: ProductsService
  ) { }

  @Post()
  async create(@Body() createVariantDto: CreateVariantDto) {
    const product = await this.productsService.findById(createVariantDto.product);
    if (!product) throw new Error();
    const variant = await this.variantsService.create(createVariantDto);
    product.variants.push(variant);
    await product.save();
    return variant;
  }

  @Get()
  async findAll() {
    return this.variantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.variantsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantsService.update(id, updateVariantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.variantsService.remove(id);
  }
}
