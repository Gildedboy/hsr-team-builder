import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export interface JwtPayload {
  sub: string
  username: string
  role: string
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateAdmin(username: string, password: string): Promise<any> {
    // Use environment variables for admin credentials
    const adminUsername = process.env.ADMIN_USERNAME || 'admin'
    const adminPassword = process.env.ADMIN_PASSWORD || 'change-me-in-production'

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
      throw new Error('Invalid credentials')
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
