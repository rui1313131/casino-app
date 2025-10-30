// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";
import { Replay } from "@sentry/replay"; // <--- この行を追加しました

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN_FRONTEND,
  tracesSampleRate: 1.0,

  // Replay（ユーザー操作の録画機能）を有効化 (オプション)
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  integrations: [
    new Replay({ // <--- 「Sentry.」を削除しました
      maskAllText: true, // テキスト入力を全てマスクする
      blockAllMedia: true, // 画像や動画をブロックする
    }),
  ],
});