import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoinsService } from './coins.service';

@Controller('coins')
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get()
  async getCoins() {
    return this.coinsService.getCoins();
  }

  @Post()
  async incrementCoins(@Body() body: { amount: number }): Promise<number> {
    const { amount } = body;
    return this.coinsService.incrementCoins(amount);
  }
}
