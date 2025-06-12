import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      console.log('Attempting to upload file:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      });

      const cloudinaryConfig = {
        cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
        api_key: this.configService.get('CLOUDINARY_API_KEY'),
        api_secret: this.configService.get('CLOUDINARY_API_SECRET')
      };

      console.log('Cloudinary config present:', {
        hasCloudName: !!cloudinaryConfig.cloud_name,
        hasApiKey: !!cloudinaryConfig.api_key,
        hasApiSecret: !!cloudinaryConfig.api_secret
      });

      let result: any = await new Promise((resolve, reject) =>
        cloudinary.uploader
          .upload_stream((err, result) => {
            if (err) {
              console.error('Cloudinary upload error:', err);
              return reject(err);
            }
            resolve(result);
          })
          .end(file.buffer),
      );

      console.log('Upload successful:', { url: result?.url });
      return { url: result?.url, type: file.mimetype };
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }
}