import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//Appel de mon interface pour typer le retour de findAll()
//import { User } from './entities/user.entity';
//Ajout de prisma
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
//JWT pour token lors de la connection
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  //ajout prisma
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
    ) {}
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    if(!user){
      throw new NotFoundException(`Il n\'existe pas d\'utilisateur avec cet id`)
    }
    return user;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  //  prisma
  // async createUser(data: Prisma.UserCreateInput): Promise<User> {
  //   return this.prisma.user.create({
  //     data,
  //   });
  // }
  //Avec utilisation de DTO pour les validations
  async createUser(data: CreateUserDto): Promise<User> {
    // Hash the password
    data.password = await bcrypt.hash(data.password, 10);
    //Insert the user into the Database via Prisma
    return this.prisma.user.create({
      data,
    });
  }

  //Connexion
  private async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if(!user) {
      throw new NotFoundException(`Il n\'y a pas d\'utilisateur correspondant à cet email ${email}`)
    }
    return user;
  }
  async connectUser(authUser: AuthCredentialsDto){
    let user: User;
    const credentialsInvalid = `Les paramètres de connection ne sont pas les bons`;
    try {
      user = await this.findByEmail(authUser.email);
    }catch{
      throw new UnauthorizedException(credentialsInvalid);
    }
    const isMatch = await bcrypt.compare(authUser.password, user.password);
    if(!isMatch){
      throw new UnauthorizedException (credentialsInvalid)
    }
    // return{
    //   message: "Bienvenue, vous avez été connecté avec succès."
    // }
    //Avec JWT
    const payload = { sub: user.id, useremail: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  // async updateUser(params: {
  //   where: Prisma.UserWhereUniqueInput;
  //   data: Prisma.UserUpdateInput;
  // }): Promise<User> {
  //   const { where, data } = params;
  //   return this.prisma.user.update({
  //     data,
  //     where,
  //   });
  // }
  // Avec utilisation de DTO pour les validations
  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data:  UpdateUserDto;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
