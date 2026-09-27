import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  getAll() {
    return this.stockService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.stockService.findById(Number(id));
  }

  @Post()
  create(
    @Body('productName') productName: string,
    @Body('quantity') quantity: number,
    @Body('quiz') quiz: string,
  ) {
    return this.stockService.create(productName, Number(quantity), quiz);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('productName') productName: string,
    @Body('quantity') quantity: number,
    @Body('quiz') quiz: string,
  ) {
    return this.stockService.update(
      Number(id),
      productName,
      Number(quantity),
      quiz  // fixed here
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.delete(Number(id));
  }
}
