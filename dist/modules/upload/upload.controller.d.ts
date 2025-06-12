import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    uploadImage(file: Express.Multer.File): Promise<{
        id: string;
        imageUrl: any;
    }>;
    uploadSong(file: Express.Multer.File): Promise<{
        id: string;
        songUrl: any;
    }>;
}
