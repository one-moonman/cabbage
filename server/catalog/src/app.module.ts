import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './category/category.module';
import { VariantsModule } from './variants/variants.module';
import { ProductsModule } from './products/products.module';
import { QueryModule } from './query/query.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/test'),
    CategoriesModule,
    ProductsModule,
    VariantsModule,
    QueryModule
  ],
})

export class AppModule { }
