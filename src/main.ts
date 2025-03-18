import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('APP_PORT');
  app.setGlobalPrefix('api');
  await app.listen(PORT ?? 3000);
}

bootstrap();
