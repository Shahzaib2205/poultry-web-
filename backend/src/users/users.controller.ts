import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

  @Post()
  create(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('role') role: string
  ) {
    return this.usersService.create(name, email, role);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('role') role: string
  ) {
    return this.usersService.update(+id, name, email, role);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
