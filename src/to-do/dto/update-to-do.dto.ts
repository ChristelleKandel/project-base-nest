import { PartialType } from '@nestjs/mapped-types';
import { CreateToDoDto } from './create-to-do.dto';

//Faut-il ré-écrire ici les chmaps modifiables ie les champs sauf id ici ?
export class UpdateToDoDto extends PartialType(CreateToDoDto) {
    readonly title: string;
    readonly description?: string;
    readonly done: boolean;
}
