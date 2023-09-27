
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(authUser: AuthCredentialsDto): Promise<any> {
    const user = await this.usersService.connectUser(authUser);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}