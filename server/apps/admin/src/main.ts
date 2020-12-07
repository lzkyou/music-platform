import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder, ApiBearerAuth } from '@nestjs/swagger';
import { AdminModule } from './admin.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AdminModule);
  app.enableCors()
  app.useStaticAssets('uploads',{
    prefix: '/uploads'
  })
  const options = new DocumentBuilder()
    .setTitle('后台管理API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  

  const port = 3002
  await app.listen(port);
  console.log('后台管理api：listen on port 3002');
  console.log('后台管理api文档：http://localhost:3002/api-docs');
}
bootstrap();
