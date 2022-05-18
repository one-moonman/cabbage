import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import findResponseDecorator from 'src/utils/find-response.decorator';
import { NotFoundInterceptor } from '../utils/404.interceptor';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

const CategoryResponse = () => findResponseDecorator(Category, "Category Not Found");

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({ type: Category })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({ type: [Category] })
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':slug')
  @CategoryResponse()
  async findOne(@Param('slug') slug: string) {
    return this.categoryService.findBySlug(slug);
  }

  @Patch(':slug')
  @CategoryResponse()
  async update(@Param('slug') slug: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(slug, updateCategoryDto);
  }

  @Delete(':slug')
  @CategoryResponse()
  async remove(@Param('slug') slug: string) {
    return this.categoryService.remove(slug);
  }
}

