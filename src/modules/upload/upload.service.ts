import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { UploadEntity } from 'src/database/upload.entity';
import { CloudinaryService } from 'src/shared/libs/Cloudinary/cloudinary.service';

import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UploadService {
  private readonly uploadRepo: Repository<UploadEntity>;

  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {
    this.uploadRepo = this.dataSource.getRepository(UploadEntity);
  }

  async uploadImage(image: Express.Multer.File) {
    if (!image) throw new BadRequestException('No image file provided');
    const imageResult = await this.cloudinaryService.uploadFile(image);
    if (!imageResult?.url) throw new BadRequestException('Image upload failed');
    const upload = this.uploadRepo.create({ imageUrl: imageResult.url });
    await this.uploadRepo.save(upload);
    return { id: upload.id, imageUrl: imageResult.url };
  }

  async uploadSong(song: Express.Multer.File) {
    if (!song) throw new BadRequestException('No song file provided');
    const songResult = await this.cloudinaryService.uploadFile(song);
    if (!songResult?.url) throw new BadRequestException('Song upload failed');
    const upload = this.uploadRepo.create({ songUrl: songResult.url });
    await this.uploadRepo.save(upload);
    return { id: upload.id, songUrl: songResult.url };
  }
}