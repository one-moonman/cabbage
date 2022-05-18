import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './category/category.module';
import { VariantsModule } from './variant/variant.module';
import { ProductsModule } from './product/product.module';
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
