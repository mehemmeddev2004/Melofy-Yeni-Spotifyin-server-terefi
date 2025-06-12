import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { RadioStationEntity } from "src/database/radio-session.entity";
import { DataSource, Repository } from "typeorm";
import { CreateRadioDto } from "./validations/create-radio.dto";
import { UpdateRadioDto } from "./validations/update-radio.dto";

@Injectable()
export class RadioService{
    private radioRepo: Repository<RadioStationEntity>
    constructor(

        @InjectDataSource() private dataSoruce: DataSource
    ){
        this.radioRepo = this.dataSoruce.getRepository(RadioStationEntity)
    }

    list(){
        let result = this.radioRepo.find({
            relations:['songs','followers','creator']
        })
        return result
    }

    findById(id:number){
        let result = this.radioRepo.findOne({where:{id}})
        return result
    }

  async create(params: CreateRadioDto) {
  const { name, description, imageUrl, type, listenerCount, totalPlays } = params;

  const existing = await this.radioRepo.findOne({ where: { name } });
  if (existing) {
    throw new BadRequestException('Bu isimde bir radyo zaten mevcut.');
  }

  const newRadio = this.radioRepo.create({
    name,
    description,
    imageUrl,
    type,
    listenerCount,
    totalPlays
  });

  return await this.radioRepo.save(newRadio);
}


async update(params: UpdateRadioDto, id: number) {
  const result = await this.radioRepo.findOne({ where: { id } });
  if (!result) throw new NotFoundException("ID bulunamadı");

  await this.radioRepo.update(id, params);

  return await this.radioRepo.findOne({ where: { id } }); // güncel halini dönebilirsin
}

async delete(id:number){
    let result = await this.radioRepo.delete({id})
    if(!result) throw new NotFoundException("ID is not found")
    await this.radioRepo.delete(id)
return {
    message: "id deleted succesfully",
    result
}
}

}