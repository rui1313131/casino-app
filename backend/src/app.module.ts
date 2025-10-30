import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { GameService } from './game/game.service'; // You would create and import this

@Module({
  imports: [],
  controllers: [AppController],
  providers: [/* GameService */],
})
export class AppModule {}
