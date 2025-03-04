import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  create(user: User): Promise<User> {
    return this.userModel.create(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    if (user) {
      await user.destroy();
    }
  }
}
