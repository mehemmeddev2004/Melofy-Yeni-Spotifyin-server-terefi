import { RadioType } from "src/database/radio-session.entity";
export declare class CreateRadioDto {
    name: string;
    description: string;
    imageUrl: string;
    type?: RadioType;
    listenerCount: number;
    totalPlays: number;
}
