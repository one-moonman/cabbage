import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException, applyDecorators } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';
import findResponseDecorator from 'src/utils/find-response.decorator';

const ProductResponse = () => findResponseDecorator(Product, "Product Not Found");

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly categoriyService: CategoryService,
    private readonly productService: ProductService
  ) { }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ type: Product })
  async create(@Body() createProductDto: CreateProductDto) {
    const category = await this.categoriyService.findById(createProductDto.category);
    if (!category) throw new NotFoundException('Category Not Found');
    const product = await this.productService.create(createProductDto);
    category.products.push(product);
    await category.save();
    return product;
  }

  @Get()
  @ApiOkResponse({ type: [Product] })
  async findAll() {
    return this.productService.findAll()
  }

  @Get(':slug')
  @ProductResponse()
  async findOne(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Get(':categorySlug/:productSlug')
  @ProductResponse()
  async findBy(@Param('categorySlug') categorySlug: string, @Param('productSlug') productSlug: string) {
    return this.productService.findBySlugAndCategory(categorySlug, productSlug);
  }

  @Patch(':slug')
  @ProductResponse()
  async update(@Param('slug') slug: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(slug, updateProductDto);
  }

  @Delete(':slug')
  @ProductResponse()
  async remove(@Param('slug') slug: string) {
    return this.productService.remove(slug);
  }
}
