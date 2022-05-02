import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { Variant, VariantModel } from './entities/variant.entity';

@Injectable()
export class VariantsService {
  constructor(@InjectModel(Variant.name) private readonly variantModel: VariantModel) { }

  async create(createVariantDto: CreateVariantDto) {
    return this.variantModel.create({
      ...createVariantDto,
      availability: createVariantDto.stock,
      commited: 0
    });
  }

  async findAll() {
    return this.variantModel.find().exec();
  }

  async findById(id: string) {
    return this.variantModel.findById(id).exec();
  }

  async findBySlug(slug: string) {
    return this.variantModel.findOne({ slug }).exec();
  }

  async update(id: string, updateProductDto: UpdateVariantDto) {
    return this.variantModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    return this.variantModel.findByIdAndRemove(id);
  }
}
