import { Module } from '@nestjs/common';
// mon module récupére le controller et les providers (essentiellement les services)

//Je rajoute un configModule en faisant npm i --save @nestjs/config pour gérer ma variable d'environnement DATABASE-URL
import { ConfigModule } from '@nestjs/config';

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
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';

// Le decorateur @Module permet de  créer un module. 
//Pour configurer un module, on "décore" une class et on lui passe un objet de configuration
// par exemple il y a une cle controllers pour déclarer les controllers propres à ce module, 
// une clé pour déclarer les providers propres à ce module (les services font partie des providers), etc...
@Module({
  imports: [ConfigModule.forRoot(), UsersModule, ToDoModule, PostModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService, PrismaService],
})
export class AppModule {}
