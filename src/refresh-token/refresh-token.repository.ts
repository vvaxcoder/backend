import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './refresh-token.entity';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly repository: Repository<RefreshToken>,
  ) {}

  async createRefreshToken(
    userId: string,
    token: string,
  ): Promise<RefreshToken> {
    const refreshToken = this.repository.create({
      user: { id: userId },
      token,
    });
    return this.repository.save(refreshToken);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.repository.findOne({ where: { token }, relations: ['user'] });
  }

  async deleteToken(token: string): Promise<void> {
    await this.repository.delete({ token });
  }

  async deleteAllForUser(userId: string): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where('userId = :userId', { userId })
      .execute();
  }
}
