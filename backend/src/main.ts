import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

async function bootstrap() {
  // Sentryの初期化 (DSNが設定されていれば)
  if (process.env.SENTRY_DSN_BACKEND) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN_BACKEND,
      integrations: [new ProfilingIntegration()],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
    });
  }

  const app = await NestFactory.create(AppModule);

  // CORSを有効にする（フロントエンドからの通信を許可）
  app.enableCors(); 

  // 【重要】Renderが指定するポートと、外部からのアクセスを受け付けるホストを指定
  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: http://0.0.0.0:${port}`);
}
bootstrap();