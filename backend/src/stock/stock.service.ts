import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  // GET all
  async findAll() {
    return this.stockRepository.find();
  }

  // GET by ID
  async findById(id: number) {
    const stock = await this.stockRepository.findOne({ where: { id } });
    if (!stock) throw new NotFoundException('Stock not found');
    return stock;
  }

  // CREATE
  async create(productName: string, quantity: number, quiz: string) {
    const newStock = this.stockRepository.create({
      productName,
      quantity: Number(quantity),
      quiz,
    });

    return this.stockRepository.save(newStock);
  }

  // UPDATE
  async update(id: number, productName: string, quantity: number, quiz: string) {
    const stock = await this.findById(id);

    stock.productName = productName;
    stock.quantity = Number(quantity);
    stock.quiz = quiz;

    return this.stockRepository.save(stock);
  }

  // DELETE
  async delete(id: number) {
    const stock = await this.findById(id);
    return this.stockRepository.remove(stock);
  }
}
