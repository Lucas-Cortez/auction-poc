import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Environment } from 'src/modules/global/domain/services/env.service';
import { DecodedUserToken } from '../../domain/entities/decoded-user-token';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(environment: Environment) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JWT_SECRET,
    });
  }

  public validate(payload: any): DecodedUserToken {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      name: payload.name,
    };
  }
}
