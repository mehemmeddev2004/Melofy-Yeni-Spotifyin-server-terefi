import { RadioService } from './radio.service';
import { CreateRadioDto } from './validations/create-radio.dto';
import { UpdateRadioDto } from './validations/update-radio.dto';
export declare class RadioController {
    private readonly radioService;
    constructor(radioService: RadioService);
    list(): Promise<import("../../../../database/radio-session.entity").RadioStationEntity[]>;
    findById(id: number): Promise<import("../../../../database/radio-session.entity").RadioStationEntity | null>;
    create(dto: CreateRadioDto): Promise<import("../../../../database/radio-session.entity").RadioStationEntity>;
    update(id: number, dto: UpdateRadioDto): Promise<import("../../../../database/radio-session.entity").RadioStationEntity | null>;
    delete(id: number): Promise<{
        message: string;
        result: import("typeorm").DeleteResult;
    }>;
}
