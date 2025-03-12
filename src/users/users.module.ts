import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.model';

@Module({
  imports: [SequelizeModule.forFeature([User])], // Регистрируем модель User в этом модуле
  providers: [UsersService], // Добавляем сервис пользователей
  controllers: [UsersController], // Добавляем контроллер пользователей
  exports: [UsersService], // Экспортируем сервис для использования в других модулях
})
export class UsersModule {}
