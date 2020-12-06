import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3001 
  await app.listen(port);
  console.log('后台管理api：listen on port 3001');
  console.log('后台管理api文档：http://localhost:3001/api-docs');
  
}
bootstrap();
