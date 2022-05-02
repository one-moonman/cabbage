import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Variant, VariantSchema } from './entities/variant.entity';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';
import { Product, ProductSchema } from 'src/products/entities/product.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: Variant.name, schema: VariantSchema },
      { name: Product.name, schema: ProductSchema }
    ])],
  controllers: [VariantsController],
  providers: [VariantsService, ProductsService]
})
export class VariantsModule { }
