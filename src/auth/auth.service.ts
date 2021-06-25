import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './models/jwt-payload';

@Injectable()
export class AuthService {
  constructor(private data: DataService, private jwt: JwtService) {}

  async signUp({ username, password }: AuthCredentialsDto): Promise<void> {
    try {
      const salt = await genSalt();
      const hashedPassword = await hash(password, salt);
      const data = { username, password: hashedPassword };
      await this.data.user.create({ data });
    } catch (error) {
      throw error.code === 'P2002'
        ? new ConflictException('Username already exists')
        : new InternalServerErrorException();
    }
  }

  async signIn({
    username,
    password,
  }: AuthCredentialsDto): Promise<JwtPayload> {
    const user = await this.data.user.findUnique({ where: { username } });

    if (!(user && (await compare(password, user?.password)))) {
      throw new UnauthorizedException('Invalid credentials...');
    }

    return { token: this.jwt.sign({ username }) };
  }
}
