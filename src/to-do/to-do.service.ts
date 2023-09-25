import { Injectable } from '@nestjs/common';
import { CreateToDoDto } from './dto/create-to-do.dto';
import { UpdateToDoDto } from './dto/update-to-do.dto';
//Appel de mon interface pour typer le retour de findAll()
import { Todo } from './interfaces/todo.interface';
// import { ToDo } from './entities/to-do.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ToDoService {
  //création "en dur" de ma data, n'ayant pas de BDD pour le moment
  //L'utilisation de l'interface Todo[] en retour permet de ne rien oublier dans notre array
  todos: Todo[] = [
    {
      id: 1,
      title: 'premiere tache',
      description: 'je décris ma première tâche',
      done: false,
    },
    {
      id: 2,
      title: 'deuxieme tache',
      description: 'je décris ma deuxième tâche',
      done: true,
    },
        {
      id: 3,
      title: 'acheter pain',
      description: 'Ne pas oublier d\'aller acheter le pain le vendredi',
      done: false,
    }
  ];

  create(createToDoDto: CreateToDoDto) {
    // return 'This action adds a new toDo';
    return this.todos.push(createToDoDto);
  }

  //Je rajoute que le return doit être de type Todo[] d'après l'interface que j'ai créée, et importée
  findAll(): Todo[] {
    // return `This action returns all toDo`;
    return this.todos;
  }

  findOne(id: number) {
    // return `This action returns a #${id} toDo`;
    return this.todos.find(todo => todo.id === id);
  }

  update(id: number, updateToDoDto: UpdateToDoDto) {
    // return `This action updates a #${id} toDo`;
    // retrouver le todo à changer avec son id
    const toDoToUpdate = this.todos.find(t => t.id === +id);
    if(!toDoToUpdate){
      return new NotFoundError("Il n\'existe pas de todo assoxié à cet id");
    }
    //appliquer les modifications et seulement les modifications, 
    //pour ne pas tout remplir de nouveau on vérifie seulement les champs qui ont été remplis dans le formulaire update
    if(updateToDoDto.hasOwnProperty('done')){
      toDoToUpdate.done = updateToDoDto.done;
    }
    if(updateToDoDto.title){
      toDoToUpdate.title = updateToDoDto.title;
    }
    if(updateToDoDto.description){
      toDoToUpdate.description = updateToDoDto.description;
    }
    // On refait une map avec les todos non modifiés + le todo modifié
    const updatedTodos = this.todos.map(t => t.id !== id ? t : toDoToUpdate);
    // On remplace todos par ce nouveau tableau
    this.todos = [...updatedTodos];
    // On return 1 modification du tableau updatedTodos, pour info on affiche le todo modifié (facultatif)
    return { updatedTodos: 1, updateToDoDto: toDoToUpdate };
  }

  remove(id: number) {
    // return `This action removes a #${id} toDo`;
    // On décide d'afficher le nombre de todo restant (facultatif)
    const nbTodoBefore = this.todos.length;
    // On fait un tableau avec uniquement les todo n'ayant pas l'id à modifier
    // Le nouveau todos [] ne contiendra plus la todo supprimé
    this.todos = this.todos.filter(t => t.id !== id);
    if(this.todos.length < nbTodoBefore){
      // on affiche que 1 todo à été deleted et le nouveau nombre de todos (restant)
      return { deletedTodos: 1, nbTodos: this.todos.length};
    }else{
      // si on n'a pas trouvé de todo à supprimer, le nombre de todo supprimé est 0 et on affiche le nombre de todo restant (inchangé)
      return { deletedTodos: 0, nbTodos: this.todos.length};
    }
    // retrouver le todo à modifier avec son id. 
    //const toDoToDelete = this.todos.find(t => t.id === id);
  }
}
