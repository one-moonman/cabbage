import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CategoriesService } from 'src/categories/categories.service';
import { NotFoundInterceptor } from 'src/utils/interceptors/NotFound.interceptor';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService
  ) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const category = await this.categoriesService.findById(createProductDto.category);
    if (!category) throw new Error();
    const product = await this.productsService.create(createProductDto);
    category.products.push(product);
    await category.save();
    return product;
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor('Product Not Found'))
  async findOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
