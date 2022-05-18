import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { ProductsModule } from 'src/product/product.module';
import { VariantsModule } from 'src/variant/variant.module';
import { Category, CategorySchema } from 'src/category/entities/category.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { Variant, VariantSchema } from 'src/variant/entities/variant.entity';
import { ProductService } from 'src/product/product.service';
import { VariantService } from 'src/variant/variant.service';

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
    providers: [CategoryService, ProductService, VariantService],
    controllers: [QueryController],
})
export class QueryModule { }
