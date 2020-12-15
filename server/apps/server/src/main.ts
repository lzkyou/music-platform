import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('前台接口API')
    .setDescription('前台API接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  const port = 3001 
  await app.listen(port);
  console.log('前台接口api：listen on port 3001');
  console.log('前台接口api文档：http://localhost:3001/api-docs');
  
}
bootstrap();
