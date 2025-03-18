import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async createRefreshToken(
    userId: string,
    token: string,
  ): Promise<RefreshToken> {
    return this.refreshTokenRepository.createRefreshToken(userId, token);
  }

  async validateRefreshToken(token: string): Promise<RefreshToken | null> {
    return this.refreshTokenRepository.findByToken(token);
  }

  async revokeToken(token: string): Promise<void> {
    return this.refreshTokenRepository.deleteToken(token);
  }

  async revokeAllTokensForUser(userId: string): Promise<void> {
    return this.refreshTokenRepository.deleteAllForUser(userId);
  }
}
