import { Injectable, Inject, ForbiddenException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class GameService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async handlePlayerBet(userId: string, roomId: number, betAmount: number): Promise<void> {
    const gameStateQuery = 'SELECT current_player_id, current_pot FROM game_states WHERE room_id = $1 FOR UPDATE;';
    const userCoinQuery = 'SELECT coin FROM users WHERE id = $1;';

    const gameStateResult = await this.pool.query(gameStateQuery, [roomId]);
    const userResult = await this.pool.query(userCoinQuery, [userId]);

    if (gameStateResult.rows.length === 0) {
      throw new BadRequestException(`Room (ID: ${roomId}) game state not found.`);
    }
    if (userResult.rows.length === 0) {
      throw new BadRequestException(`User (ID: ${userId}) not found.`);
    }

    const gameState = gameStateResult.rows[0];
    const user = userResult.rows[0];

    if (gameState.current_player_id !== userId) {
      throw new ForbiddenException('Not your turn.');
    }

    if (user.coin < betAmount) {
      throw new ForbiddenException('Insufficient funds for the bet.');
    }

    console.log(`Validation successful: User ${userId} bet ${betAmount}.`);
    // ... proceed with bet logic
  }

  async collectEntryFees(participantIds: string[], entryFee: number): Promise<void> {
    const client: PoolClient = await this.pool.connect();

    try {
      await client.query('BEGIN');
      console.log('Transaction started.');

      const negativeEntryFee = -Math.abs(entryFee);

      for (const userId of participantIds) {
        console.log(`Collecting ${entryFee} from user ${userId}...`);
        await client.query('SELECT update_user_coin($1, $2)', [userId, negativeEntryFee]);
      }

      await client.query('COMMIT');
      console.log('All entry fees collected. Transaction committed.');

    } catch (error) {
      console.error('Error collecting entry fees. Rolling back transaction.', error);
      await client.query('ROLLBACK');
      throw new InternalServerErrorException('Failed to collect entry fees.');

    } finally {
      client.release();
      console.log('DB client released.');
    }
  }
}
