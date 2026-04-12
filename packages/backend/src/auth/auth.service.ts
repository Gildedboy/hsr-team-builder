import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { getAdminPassword, getAdminUsername } from '../config/env'

export interface JwtPayload {
  sub: string
  username: string
  role: string
}

interface AdminUser {
  id: string
  username: string
  role: string
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateAdmin(username: string, password: string): AdminUser | null {
    const adminUsername = getAdminUsername()
    const adminPassword = getAdminPassword()

    if (username === adminUsername && password === adminPassword) {
      return {
        id: 'admin-001',
        username: adminUsername,
        role: 'admin',
      }
    }
    return null
  }

  async login(username: string, password: string) {
    const user = await this.validateAdmin(username, password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    }
  }
}
