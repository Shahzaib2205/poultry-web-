import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';  // Change this line

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepo.find();
  }

  async findById(id: number) {
    return await this.userRepo.findOneBy({ id });
  }

  async create(name: string, email: string, role: string) {
    const newUser = this.userRepo.create({ name, email, role });
    return await this.userRepo.save(newUser);
  }

  async update(id: number, name: string, email: string, role: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) return { message: "User not found" };

    user.name = name;
    user.email = email;
    user.role = role;

    return await this.userRepo.save(user);
  }

  async delete(id: number) {
    return await this.userRepo.delete(id);
  }
}