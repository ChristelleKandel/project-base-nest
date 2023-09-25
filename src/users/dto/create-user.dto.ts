import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
//Ajout de ApiProperty de Swagger pour voir chaque variable dans mon swagger
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

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
