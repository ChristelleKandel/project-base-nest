import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
//Appel de mon interface pour typer le retour de findAll()
import { Todo } from './interfaces/todo.interface';

@Controller('to-do')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  // le decorateur @Body permet de récupérer le body envoyé avec notre request, on le passe dans les paramètre de notre function create
  @Post()
  create(@Body() createToDoDto: CreateToDoDto) {
    return this.toDoService.create(createToDoDto);
  }

  @Get()
  findAll(): Todo[] {
    return this.toDoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toDoService.findOne(+id);
  }

  @Patch(':id')
  // avec update on utilise 2 paramètres: l'ID à modifier, et le body
  update(@Param('id') id: string, @Body() updateToDoDto: UpdateToDoDto) {
    return this.toDoService.update(+id, updateToDoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toDoService.remove(+id);
  }
}
