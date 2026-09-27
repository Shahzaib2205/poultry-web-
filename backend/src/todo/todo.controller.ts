  import { Controller, Get, Post, Body, Delete, Param, Put } from '@nestjs/common';
  import { TodoService } from './todo.service';
  import { ServerDescription } from 'typeorm';

  @Controller('todo')
  export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    getAll() {
      return this.todoService.findAll();
    }

    @Get(":id")
    getById(@Param("id") id:string){
      return this.todoService.findById(+id);
    }

    @Post()
    create(@Body('title') title:string, @Body('content') content:string) {
      return this.todoService.create(title, content);
    }
    @Put(":id")
    update(@Param('id') id: string,@Body("title") title: string, @Body("description") description: string) { 
    return this.todoService.update(+id, title, description);
  }


    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.todoService.delete(id);
    }
  }
