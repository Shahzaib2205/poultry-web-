import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { BirdService } from './birds.service';

@Controller('birds')
export class BirdController {
  constructor(private readonly birdService: BirdService) {}

  @Get()
  getAll() {
    return this.birdService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.birdService.findById(+id);
  }

  @Post()
  create(
    @Body('breedname') breedname: string,
    @Body('totalbirds') totalbirds: number,
    @Body('dateAdded') dateAdded: Date,
    @Body('university') university: string,
  ) {
    return this.birdService.create( breedname, totalbirds, new Date(dateAdded),university);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('breedname') breedname: string,
    @Body('totalbirds') totalbirds: number,
    @Body('dateAdded') dateAdded: Date,
    @Body('university') university: string,
  ) {
    return this.birdService.update(+id, breedname, totalbirds, new Date(dateAdded),university);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.birdService.delete(+id);
  }
}
