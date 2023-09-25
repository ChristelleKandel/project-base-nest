import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//Prisma
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
  //Prisma
  //Ajout de l'auteur qui publie le post
  // @Post('user')
  // async signupUser(
  //   @Body() userData: { name?: string; email: string; password: string; },
  // ): Promise<UserModel> {
  //   return this.usersService.createUser(userData);
  // }

  @Get()
  async findAll(): Promise<UserModel[]> {
    return this.usersService.users({});
  }

  @Get('user/:id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.user({ id: Number(id) });
  }

  @Patch('update-user/:id')
  async update(@Param('id, where') id: string, @Body() data: UpdateUserDto): Promise<UserModel> {
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
