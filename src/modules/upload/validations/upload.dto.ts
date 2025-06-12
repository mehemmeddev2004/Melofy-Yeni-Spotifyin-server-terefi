import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Yüklenecek görsel dosya',
  })
  image: any;
}

export class UploadSongDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Yüklenecek müzik dosyası (mp3, wav vs)',
  })
  song: any;
}
