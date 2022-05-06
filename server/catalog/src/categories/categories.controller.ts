import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundInterceptor } from '../utils/404.interceptor';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

const CategoryResponse = () => applyDecorators(
  ApiOkResponse({ type: Category }),
  ApiNotFoundResponse(),
  UseInterceptors(new NotFoundInterceptor('Category Not Found'))
);

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({ type: Category })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({ type: [Category] })
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @CategoryResponse()
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  @Patch(':id')
  @CategoryResponse()
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @CategoryResponse()
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}

