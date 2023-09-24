import { Module } from '@nestjs/common';
// mon module récupére le controller et les providers (essentiellement les services)

// le controller écoute les request en envoie une respons
import { AppController } from './app.controller';
// les services permettent de fournir des fonctionnalités au controller
import { AppService } from './app.service';
// puis je récupère les modules des autres ressources
import { UsersModule } from './users/users.module';
// si un service est créé sans module, je dois récupérer son controller et ses services
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
