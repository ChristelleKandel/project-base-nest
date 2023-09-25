import { NestFactory } from '@nestjs/core';
//Ajout de swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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

  //Ajout de swagger
  //exemple avec les cats
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // (port 3000) par défaut
  await app.listen(3000);
}
bootstrap();
