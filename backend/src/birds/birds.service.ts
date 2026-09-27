import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bird } from './birds.entity';

@Injectable()
export class BirdService {
  constructor(
    @InjectRepository(Bird) private readonly birdRepository: Repository<Bird>,
  ) {}

  async findAll() {
    return await this.birdRepository.find();
  }

  async findById(id: number) {
    const bird = await this.birdRepository.findOne({ where: { id } });
    if (!bird) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }
    return bird;
  }

  async create(breedname: string, totalbirds: number, dateAdded: Date,university:string) {
    const newBird = this.birdRepository.create({
      breedname,
      totalbirds,
      dateAdded,
      university,
    });
    return await this.birdRepository.save(newBird);
  }

  async update(id: number, breedname: string, totalbirds: number, dateAdded: Date,university:string) {
    const bird = await this.findById(id);
    bird.breedname = breedname;
    bird.totalbirds = totalbirds;
    bird.dateAdded = dateAdded;
    bird.university = university;
    return await this.birdRepository.save(bird);
  }

  async delete(id: number) {
    const result = await this.birdRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bird with ID ${id} not found`);
    }
    return { message: 'Deleted successfully' };
  }
}
