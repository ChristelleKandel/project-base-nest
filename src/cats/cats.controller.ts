import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
//Utilisation de Request object et Express
//import { Request } from 'express';
import { CreateCatDto } from './dto/create-cat.dto.js';
// import des provides services et de l'interface Cat
import { CatsService } from './cats.service';
import { Cat } from '../interfaces/cats.interface';

// ce controller sera appelé par la route /cats
//si je rajoute un terme dans @Get('siamois'), la route sera /cats/siamois
@Controller('cats')
export class CatsController {
  //ajout du constructeur qui déclare et initialize catsService
  constructor(private catsService: CatsService) {}

  @Post()
  //si j'installe class-validation je peux l'utiliser pour vérifier que le body de mon createCatDto est conforme
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    // return 'This action adds a new cat';
    this.catsService.create(createCatDto);
  }

  @Get()
  //Je note ici ma fonction qui explique ce que je dois afficher en appelant cette route
  // pour les primitive type, la value est returned
  //pour les series (array, object), le return sera automatiquement de type JSON
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  //   @Get(':id')
  //   findOne(@Param() params: any): string {
  //     return `This action returns a #${params.id} cat`;
  //   }
  @Get(':id')
  //Parse IntPipe assure que le param id est un integer ou renvoie une erreur pour que findOne ne cherche pas à s'exécuter
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }
}
