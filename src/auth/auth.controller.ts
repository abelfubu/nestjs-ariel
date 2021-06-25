import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './models/jwt-payload';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signup')
  signUp(@Body() credentials: AuthCredentialsDto): Promise<void> {
    return this.service.signUp(credentials);
  }

  @Post('signin')
  signIn(@Body() credentials: AuthCredentialsDto): Promise<JwtPayload> {
    return this.service.signIn(credentials);
  }
}
