import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'hsr-team-builder-secret-key',
    })
  }

  async validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    }
  }
}
