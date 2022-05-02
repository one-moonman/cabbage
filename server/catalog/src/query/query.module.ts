import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { QueryController } from './query.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/categories/entities/category.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { CategoriesService } from 'src/categories/categories.service';
import { CategorySlugMiddleware } from './query.middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), CategoriesModule],
  providers: [CategoriesService],
  controllers: [QueryController],
})
export class QueryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CategorySlugMiddleware).forRoutes(QueryController)
  }
}
