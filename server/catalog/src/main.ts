import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from 'src/interceptors/Transform.interceptor';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  app
    .setGlobalPrefix('api/v1/catalog')
    .useGlobalInterceptors(new TransformInterceptor())

  const config = new DocumentBuilder()
    .setTitle('Cabbage catalog')
    .setDescription('asdasd')
    .setVersion('1.0')
    .addTag('catalog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
