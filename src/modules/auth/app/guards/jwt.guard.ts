import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticateErrors } from '../../domain/enum/error-messages';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    if (err) throw err;

    if (!user) throw new UnauthorizedException(AuthenticateErrors.NotAllowed);

    return user;
  }
}
