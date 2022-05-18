import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { CategoriesModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { Category, CategorySchema } from 'src/category/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema }]
    ),
    CategoriesModule
  ],
  controllers: [ProductController],
  providers: [ProductService, CategoryService]
})
export class ProductsModule { }
