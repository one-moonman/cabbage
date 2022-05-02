import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { VariantsModule } from './variants/variants.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesService } from './categories/categories.service';
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
