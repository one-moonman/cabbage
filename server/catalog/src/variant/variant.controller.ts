import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, applyDecorators, Put } from '@nestjs/common';
import { VariantService } from './variant.service';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { ProductService } from 'src/product/product.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Variant } from './entities/variant.entity';
import findResponseDecorator from 'src/utils/find-response.decorator';

const VariantResponse = () => findResponseDecorator(Variant, "Variant Not Found");

@ApiTags('variants')
@Controller('variants')
export class VariantController {
  constructor(
    private readonly variantService: VariantService,
    private readonly productService: ProductService
  ) { }

  @Post()
  @ApiBody({ type: CreateVariantDto })
  @ApiCreatedResponse({ type: Variant })
  async create(@Body() createVariantDto: CreateVariantDto) {
    const product = await this.productService.findById(createVariantDto.product);
    if (!product) throw new Error();
    if (`${product.category}` !== createVariantDto.category) throw new Error();
    const variant = await this.variantService.create(createVariantDto);
    product.variants.push(variant);
    await product.save();
    return variant;
  }

  @Get()
  @ApiOkResponse({ type: Variant })
  async findAll() {
    return this.variantService.findAll();
  }

  @Get(':slug')
  @VariantResponse()
  async findBySlug(@Param('slug') id: string) {
    return this.variantService.findBySlug(id);
  }

  @Put(':id')
  @VariantResponse()
  async get(@Param('id') id: string, @Query('qty') quantity: number) {
    return this.variantService.findAndRecalculateAvailability(id, quantity);
  }

  @Patch(':slug')
  @VariantResponse()
  async update(@Param('slug') slug: string, @Body() updateVariantDto: UpdateVariantDto) {
    return this.variantService.update(slug, updateVariantDto);
  }

  @Delete(':slug')
  @VariantResponse()
  async remove(@Param('slug') slug: string) {
    return this.variantService.remove(slug);
  }
}
