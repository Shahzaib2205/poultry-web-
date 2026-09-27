import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) { }

  async findAll() {
    return await this.todoRepo.find();
  }

  async findById(id: number) {
    return await this.todoRepo.findOneBy({ id });
  }

  async create(title: string, description: string) {
    const newTodo = this.todoRepo.create({
      title: title,
      content: description,
    });

    return await this.todoRepo.save(newTodo);
  }

  async update(id: number, title: string, description: string) {
    console.log("Received:", { id, title, description });

    const todo = await this.todoRepo.findOneBy({ id });

    if (!todo) {
      return { message: "Todo not found" };
    }

    todo.title = title;
    todo.content = description;

    const result = await this.todoRepo.save(todo);
    console.log("Updated Result:", result);

    return result;
  }

  async delete(id: number) {
    return await this.todoRepo.delete(id);
  }
}
