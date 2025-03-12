import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: { id: string };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userDto: { login: string; password: string }) {
    return this.authService.login(userDto);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: RequestWithUser) {
    const userId = (req.user as { id: string })?.id;

    return this.authService.logout(userId);
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { token: string }) {
    return await this.authService.refreshToken(body.token);
  }
}
