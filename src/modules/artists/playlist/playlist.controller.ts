import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { FilterPlaylistDto } from "./validations/filter-playlist.dto";
import { CreatePlaylistDto } from "./validations/create-playlist.dto";
import { UpdatePlaylistDto } from "./validations/update-playlist.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "src/guards/Auth.guard";

@Controller('playlist')
export class PlaylistController {
  constructor(
    private playlistService: PlaylistService
  ) { }

  @Get()
  list() {
    return this.playlistService.list()
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.playlistService.findById(id)
  }

  @Get('filter')
  filter(@Query() query: FilterPlaylistDto) {
    return this.playlistService.filter(query);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('owner/:ownerId')
  async create(@Body() body: CreatePlaylistDto) {
    return this.playlistService.create(body);
  }


  @Put(':id')
  async update(@Param('id') id: number, @Body() params: UpdatePlaylistDto) {
    return this.playlistService.update(params, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.playlistService.delete(id)
  }



}