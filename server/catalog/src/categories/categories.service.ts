import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category, CategoryModel } from './entities/category.entity';
import { Connection } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Category.name) private readonly categoryModel: CategoryModel) {
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  async findAll() {
    return this.categoryModel.find().exec();
  }

  async findById(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  async findBySlug(slug: string) {
    return this.categoryModel.findOne({ slug }).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
  }

  async remove(id: string) {
    await Promise.all([
      this.connection.collection('products').deleteMany({ category: id }),
      this.connection.collection('variants').deleteMany({ category: id })
    ])
    return this.categoryModel.findByIdAndRemove(id);
  }
}
