import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DataService } from 'src/data/data.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private data: DataService) {
    super({
      secret: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    });
  }

  async validate({ username }: { username: string }): Promise<User> {
    const user = await this.data.user.findUnique({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
