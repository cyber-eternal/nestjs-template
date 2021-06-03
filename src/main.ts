import { initApp } from '@app/app';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await initApp();
  const configService = app.get(ConfigService);
  await app.listen(configService.get('app').port);
}
bootstrap();
