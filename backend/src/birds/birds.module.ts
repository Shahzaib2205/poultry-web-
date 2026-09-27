import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bird } from './birds.entity';
import { BirdService } from './birds.service';
import { BirdController } from './birds.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bird])],
  providers: [BirdService],
  controllers: [BirdController],
})
export class BirdModule {}
