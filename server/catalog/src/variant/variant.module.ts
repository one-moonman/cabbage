import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Variant, VariantSchema } from './entities/variant.entity';
import { ProductsModule } from 'src/product/product.module';
import { ProductService } from 'src/product/product.service';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: Variant.name, schema: VariantSchema },
      { name: Product.name, schema: ProductSchema }
    ])],
  controllers: [VariantController],
  providers: [VariantService, ProductService]
})
export class VariantsModule { }
