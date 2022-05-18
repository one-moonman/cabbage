import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { Variant, VariantModel } from './entities/variant.entity';

@Injectable()
export class VariantService {
  constructor(@InjectModel(Variant.name) private readonly variantModel: VariantModel) { }

  async create(createVariantDto: CreateVariantDto) {
    return this.variantModel.create({
      ...createVariantDto,
      availability: createVariantDto.stock,
      committed: 0
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

  async findBySlugAndRefSlugs(categorySlug: string, productSlug: string, variantSlug: string) {
    const variant = await this.variantModel.findOne({ slug: variantSlug })
      .populate('category')
      .populate('product')
      .exec();
    if (
      variant.product.slug === productSlug &&
      variant.category.slug === categorySlug
    ) {
      return variant.depopulate('product').depopulate('category');
    }
    return null;
  }

  // or slug
  async findAndRecalculateAvailability(id: string, availability: number) {
    return this.variantModel.findByIdAndUpdate(id, { availability })
  }

  async update(slug: string, updateVariantDto: UpdateVariantDto) {
    return this.variantModel.findOneAndUpdate({ slug }, updateVariantDto).exec();
  }

  async remove(slug: string) {
    return this.variantModel.findOneAndRemove({ slug }).exec();
  }
}
