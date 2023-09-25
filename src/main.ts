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
  //exemple de config, personnalisable, visible sur localhost:3000/api
  const config = new DocumentBuilder()
    .setTitle('CKweb swagger')
    .setDescription('The API description: test de nestJS')
    .setVersion('1.0')
    .addTag('nestJS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // (port 3000) par défaut
  await app.listen(3000);
}
bootstrap();
