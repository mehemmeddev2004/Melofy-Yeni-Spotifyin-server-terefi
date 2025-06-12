import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { UploadService } from './upload.service';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { UPLOAD_IMAGE_MAX_SIZE } from 'src/constants/upload.constoants';
import { UploadImageDto, UploadSongDto } from './validations/upload.dto';
import { imageFileFilter } from './upload.filters';

@ApiTags('Upload')
@Controller('upload')
@Auth()
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: imageFileFilter,
      limits: { fileSize: UPLOAD_IMAGE_MAX_SIZE },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadImageDto })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No image file provided');
    return this.uploadService.uploadImage(file);
  }

  @Post('song')
  @UseInterceptors(
    FileInterceptor('song', {
      storage: memoryStorage(),
      limits: { fileSize: 30 * 1024 * 1024 }, // 30MB örnek
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadSongDto })
  async uploadSong(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No song file provided');
    return this.uploadService.uploadSong(file);
  }
}