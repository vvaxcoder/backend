import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  private blacklistedTokens = new Set<string>();

  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findOneByLogin(login);

    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.dataValues as User;
      return result;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: { login: string; password: string }) {
    const validatedUser = await this.validateUser(user.login, user.password);
    const validatedUserId = validatedUser?.id;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return { token: this.jwtService.sign({ id: validatedUserId }) };
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async logout(userId: string) {
    this.blacklistedTokens.add(userId);
    return { message: 'Logged out successfully' };
  }

  async refreshToken(oldToken: string) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const payload = this.jwtService.verify(oldToken);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      if (this.blacklistedTokens.has(payload?.id)) {
        throw new UnauthorizedException('Token is blacklisted');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const newToken = await this.jwtService.sign({ id: payload.id });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return { token: newToken };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
