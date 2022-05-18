import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductModel } from './entities/product.entity';
import { Connection } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Product.name) private readonly productModel: ProductModel
  ) { }

  async create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  async findAll() {
    return this.productModel.find().exec();
  }

  async findById(id: string) {
    return this.productModel.findById(id).exec();
  }

  async findBySlug(slug: string) {
    return this.productModel.findOne({ slug }).exec();
  }

  async findBySlugAndCategory(categorySlug: string, productSlug: string) {
    const product = await this.productModel.findOne({ slug: productSlug })
      .populate('category')
      .exec();
    if (product.category.slug !== categorySlug) return null;
    return product.depopulate('category');
  }

  async update(slug: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findOneAndUpdate({ slug }, updateProductDto);
  }

  async remove(slug: string) {
    const product = await this.productModel.findOneAndRemove({ slug });
    await this.connection.collection('variants').deleteMany({ product: product.id });
    return product;
  }
}
