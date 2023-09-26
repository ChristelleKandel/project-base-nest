import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto extends PartialType(CreateUserDto) {
    
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "le mot de passe de l'utilisateur",
    minLength: 3,
    maxLength: 30,
    default: "mdp",
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  password: string;
}
