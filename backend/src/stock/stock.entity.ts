import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stocks')
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column()
  quiz: string;
}
