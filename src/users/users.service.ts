import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  // async create(createUserDto: CreateUserDto) {
  //   await this.prisma.book.create({
  //   data: createBookDto
  //  })
  // }

  findAll() {
    return `This action returns all users`;
    // return this.prima.book.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
    // return this.prima.book.findUnique({ where: { id }});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
    // return this.prisma.book.delete({ where: { id } });
  }
}
