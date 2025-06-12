import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { ArtistsService } from "./artists.service";
import { CreateArtistsDto } from "./validations/create-artists.dto";
import { UpdateArtistDto } from "./validations/update.artists.dto";


@Controller('artists')
export class ArtistsController {
    constructor(
        private artistsService: ArtistsService
    ) { }

@Get()
list(){
    return this.artistsService.list()
}

@Get(':id')
findbyId(@Param('id') id: number){
    return this.artistsService.findbyId(id)
}

@Post(':categoryId')
create(@Body() body: CreateArtistsDto, @Param('categoryId') categoryId: number){
   return this.artistsService.create(body, categoryId)
}


@Put(':id')
update(@Param('id') id: number, @Body() body: UpdateArtistDto) {
  return this.artistsService.update(id, body)
}

@Delete(':id')
delete(@Param('id') id:number){
    return this.artistsService.delete(id)
}

}