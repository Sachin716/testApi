import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  app.enableCors({
    origin: '*', // Specify your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include credentials if needed
  });
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
