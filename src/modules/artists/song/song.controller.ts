import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { SongService } from "./song.service";
import { CreateSongDto } from "./validations/create-song.dto";
import { UpdateSongDto } from "./validations/update-song.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/Auth.guard";

@Controller('song')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  list() {
    return this.songService.list();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.songService.findById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  create(@Body() body: CreateSongDto) {
    return this.songService.create(body);
  }

  @Post(':id/update') 
  update(@Body() body: UpdateSongDto, @Param('id') id: number) {
    return this.songService.update(body, id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.songService.delete(id);
  }

  @Post(':id/start')
  startMusic(@Param('id') id: number) {
    return this.songService.startMusic(id);
  }


  @Post('next') 
  nextMusic() {
    return this.songService.nextMusic();
  }

  @Post('prev') 
  prevMusic() {
    return this.songService.prevMusic();
  }

  @Post('stop')
  stopMusic() {
    return this.songService.stopMusic();
  }
}
