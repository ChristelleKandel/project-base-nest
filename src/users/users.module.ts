import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
//Passport (facultatif)
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [JwtModule,
    // ajout de mon fichier constants.js avec mon code secret
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, LocalStrategy],
})
export class UsersModule {}
