import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, NotFoundException, applyDecorators } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { NotFoundInterceptor } from 'src/utils/404.interceptor';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './entities/product.entity';

const ProductResponse = () => applyDecorators(
  ApiOkResponse({ type: Product }),
  ApiNotFoundResponse(),
  UseInterceptors(new NotFoundInterceptor('Product Not Found'))
);

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService
  ) { }

  @Post()
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ type: Product })
  async create(@Body() createProductDto: CreateProductDto) {
    const category = await this.categoriesService.findById(createProductDto.category);
    if (!category) throw new NotFoundException('Category Not Found');
    const product = await this.productsService.create(createProductDto);
    category.products.push(product);
    await category.save();
    return product;
  }

  @Get()
  @ApiOkResponse({ type: [Product] })
  async findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  @ProductResponse()
  async findOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Patch(':id')
  @ProductResponse()
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ProductResponse()
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
