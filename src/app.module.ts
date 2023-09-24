import { Module } from '@nestjs/common';
// mon module récupére le controller et les providers (essentiellement les services)
import { AppController } from './app.controller';
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
