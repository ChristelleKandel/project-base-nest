import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
  findOne(id: number) {
    return `This action returns a #${id} cat`;
    // return this.prima.book.findUnique({ where: { id }});
  }
}
