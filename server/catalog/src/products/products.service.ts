import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductModel } from './entities/product.entity';
import { Connection } from 'mongoose';

@Injectable()
export class ProductsService {
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

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    await this.connection.collection('variants').deleteMany({ product: id });
    return this.productModel.findByIdAndRemove(id);
  }
}
