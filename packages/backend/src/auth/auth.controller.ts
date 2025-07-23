import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger'
import { AuthService } from './auth.service'

class LoginDto {
  username: string
  password: string
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Admin login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Admin logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password)
  }
}
