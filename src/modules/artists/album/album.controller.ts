import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  Query, 
  ParseIntPipe, 
  NotFoundException 
} from "@nestjs/common";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./validations/create-album.dto";
import { UpdateAlbumDto } from "./validations/update-album.dto";
import { FilterAlbumDto } from "./validations/filter-album.dto";

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async list() {
    return await this.albumService.list();
  }

  @Get('filter')
  async filter(@Query() filter: FilterAlbumDto) {
    return await this.albumService.filter(filter);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const album = await this.albumService.findById(id);
    if (!album) throw new NotFoundException(`Album with id ${id} not found`);
    return album;
  }

  @Post()
  async create(@Body() params: CreateAlbumDto) {
    return await this.albumService.create(params);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() params: UpdateAlbumDto
  ) {
    return await this.albumService.update(params, id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.albumService.delete(id);
  }
}
