import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

//La function d'amorce (bootstrap) de l'App
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //ajout d'un pipe de validation global
  app.useGlobalPipes(
    new ValidationPipe({
      // retire tout les champs qui ne sont pas déclaré dans la dto
      whitelist: true,
      // rejette les requêtes qui contiennent des champs non déclarés dans la dto
      forbidNonWhitelisted: true,
    }),
  );
  // (port 3000) par défaut
  await app.listen(3000);
}
bootstrap();
