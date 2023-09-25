import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//Appel de mon interface pour typer le retour de findAll()
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      name: "Timotea",
      email: "tim@gmail.com",
      password: "timtim",
    },
    {
      name: "Always",
      email: "toujours@gmail.com",
      password: "forever",
    }
  ]
  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    return this.users.push(createUserDto);
  }
  // async create(createUserDto: CreateUserDto) {
  //   await this.prisma.book.create({
  //   data: createBookDto
  //  })
  // }

  findAll() {
    return `This action returns all users`;
    // return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
    // return this.prisma.book.findUnique({ where: { id }});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
    // return this.prisma.book.delete({ where: { id } });
  }
}
