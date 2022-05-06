import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';
import { ProductsModule } from 'src/products/products.module';
import { VariantsModule } from 'src/variants/variants.module';
import { Category, CategorySchema } from 'src/categories/entities/category.entity';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
import { Variant, VariantSchema } from 'src/variants/entities/variant.entity';
import { ProductsService } from 'src/products/products.service';
import { VariantsService } from 'src/variants/variants.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Category.name, schema: CategorySchema },
    { name: Product.name, schema: ProductSchema },
    { name: Variant.name, schema: VariantSchema }
  ]),
    CategoriesModule,
    ProductsModule,
    VariantsModule
  ],
  providers: [CategoriesService, ProductsService, VariantsService],
  controllers: [QueryController],
})
export class QueryModule { }
