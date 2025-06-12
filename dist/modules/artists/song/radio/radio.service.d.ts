import { RadioStationEntity } from "src/database/radio-session.entity";
import { DataSource } from "typeorm";
import { CreateRadioDto } from "./validations/create-radio.dto";
import { UpdateRadioDto } from "./validations/update-radio.dto";
export declare class RadioService {
    private dataSoruce;
    private radioRepo;
    constructor(dataSoruce: DataSource);
    list(): Promise<RadioStationEntity[]>;
    findById(id: number): Promise<RadioStationEntity | null>;
    create(params: CreateRadioDto): Promise<RadioStationEntity>;
    update(params: UpdateRadioDto, id: number): Promise<RadioStationEntity | null>;
    delete(id: number): Promise<{
        message: string;
        result: import("typeorm").DeleteResult;
    }>;
}
