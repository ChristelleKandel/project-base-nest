import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// on ajoute des decorateurs avec @ pour ajouter des fonctionnalités à une class Controller
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // ici on ajoute un decorateur pour ajouter des fonctionnalités à une méthode Get
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
