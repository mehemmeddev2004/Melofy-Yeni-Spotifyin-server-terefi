import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CategoryEntity } from "src/database/category.entity";

import { ArtistEntity } from "src/database/artists.entity";
import { CreateArtistsDto } from "./validations/create-artists.dto";
import { UpdateArtistDto } from "./validations/update.artists.dto";
import { ClsService } from "nestjs-cls";



@Injectable()
export class ArtistsService {
  private categoryRepo: Repository<CategoryEntity>;
  private artistRepo: Repository<ArtistEntity>;

  constructor(
    private cls: ClsService,
    @InjectDataSource() private dataSource: DataSource
  ) {
    this.artistRepo = this.dataSource.getRepository(ArtistEntity);
    this.categoryRepo = this.dataSource.getRepository(CategoryEntity);
  }

  async list() {
    try {
      return await this.artistRepo.find({
        relations: ['children', 'category','songs','albums', 'featuredAlbums', 'followers', ],
      });
    } catch (err) {
   console.error('Error creating artist:', err);
      throw new BadRequestException('Failed to create artists: ' + (err.message || err));
    }
  }

  async findbyId(id: number) {
    try {
      const result = await this.artistRepo.findOne({ 
        where: { id } ,
        relations: ['children', 'category', 'songs'],
      });
      if (!result) {
        throw new NotFoundException(`Artists with id ${id} not found`);
      }
      return result;
    } catch (err) {
      throw new BadRequestException('Failed to find artists',err);
    }
  }

  async create(params: CreateArtistsDto, id: number) {
    try {
      console.log('Creating artist with params:', params);
      console.log('Category ID:', id);
      let parentArists: ArtistEntity | null = null;

      if (params.parentId) {
        parentArists = await this.artistRepo.findOneBy({ id: params.parentId });
        if (!parentArists) {
          throw new NotFoundException('Parent artists not found');
        }
      }

      const category = await this.categoryRepo.findOne({ where: { id } });
      if (!category) {
        throw new NotFoundException("Category id is not found");
      }

      const artists = this.artistRepo.create({
        name: params.name,
        imageUrl: params.imgUrl,
        country: params.country,
        website: params.website,  
        bio: params.bio,
        category,
      });

      await this.artistRepo.save(artists);

      return {
        message: 'Artists created successfully',
        artists,
      };
    } catch (err) {
      console.error('Error creating artist:', err);
      throw new BadRequestException('Failed to create artists: ' + (err.message || err));
    }
  }

async update(id: number, params: UpdateArtistDto) {
  const artist = await this.artistRepo.findOne({ where: { id } });
  if (!artist) throw new NotFoundException('Artist not found');

  if (params.categoryId) {
    const category = await this.categoryRepo.findOne({ where: { id: params.categoryId } });
    if (!category) throw new NotFoundException('Category not found');
  }

  await this.artistRepo.update(id, params);

  const updatedArtist = await this.artistRepo.findOne({ where: { id } });
  return {
    message: 'Artist updated successfully',
    artist: updatedArtist,
  };
}

  async delete(id: number) {
    try {
      const artists = await this.artistRepo.findOne({ where: { id } });
      if (!artists) {
        throw new NotFoundException("Actress not found");
      }

      await this.artistRepo.delete(id);

      return {
        message: "Artists deleted successfully",
        artists,
      };
    } catch (err) {
      throw new BadRequestException('Failed to delete artists',err);
    }
  }
}
