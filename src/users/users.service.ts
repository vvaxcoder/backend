import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const password = userData?.password as string;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ ...userData, password: hashedPassword });
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    await user.destroy();
  }

  async findOneByLogin(login: string) {
    return this.userModel.findOne({ where: { login } });
  }
}
