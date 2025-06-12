import { CloudinaryService } from 'src/shared/libs/Cloudinary/cloudinary.service';
import { DataSource } from 'typeorm';
export declare class UploadService {
    private readonly cloudinaryService;
    private readonly dataSource;
    private readonly uploadRepo;
    constructor(cloudinaryService: CloudinaryService, dataSource: DataSource);
    uploadImage(image: Express.Multer.File): Promise<{
        id: string;
        imageUrl: any;
    }>;
    uploadSong(song: Express.Multer.File): Promise<{
        id: string;
        songUrl: any;
    }>;
}
