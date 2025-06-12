import { Module } from '@nestjs/common';

import { UploadService } from './upload.service';
import { CloudinaryModule } from 'src/shared/libs/Cloudinary/cloudinary.module';
import { UploadController } from './upload.controller';
import { UserService } from '../users/user.service';


@Module({
  imports: [CloudinaryModule],
  controllers: [UploadController],
  providers: [UploadService, UserService]
})
export class UploadModule {}