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
//Ajout automatique des module créer avec nest g mo ou nest g resource (g pour générate)
import { ToDoModule } from './to-do/to-do.module';

// Le decorateur @Module permet de  créer un module. 
//Pour configurer un module, on "décore" une class et on lui passe un objet de configuration
// par exemple il y a une cle controllers pour déclarer les controllers propres à ce module, 
// une clé pour déclarer les providers propres à ce module (les services font partie des providers), etc...
@Module({
  imports: [UsersModule, ToDoModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
