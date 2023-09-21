import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//La function d'amorce (bootstrap) de l'App
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
