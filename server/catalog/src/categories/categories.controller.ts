import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { NotFoundInterceptor } from 'src/utils/interceptors/NotFound.interceptor';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

const CategoryNotFound = new NotFoundInterceptor('Category Not Found');

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @ApiBody({ type: CreateCategoryDto })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @UseInterceptors(CategoryNotFound)
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(CategoryNotFound)
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
