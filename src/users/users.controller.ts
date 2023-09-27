import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//Prisma
import { User as UserModel } from '@prisma/client';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
//Guards
import { AuthGuard } from './auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //Connection d'un user 
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(@Body(ValidationPipe) data: AuthCredentialsDto) {
    return this.usersService.connectUser(data);
  }

  //Enregistrement d'un nouvel user 
  @Post('sign-up')
  create(@Body(ValidationPipe) data: CreateUserDto) {
    return this.usersService.createUser(data);
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

  @UseGuards(AuthGuard)
  @Get(':id')
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

  @Delete('delete-user/:id')
  async remove(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.deleteUser({ id: Number(id) });
  }
}
