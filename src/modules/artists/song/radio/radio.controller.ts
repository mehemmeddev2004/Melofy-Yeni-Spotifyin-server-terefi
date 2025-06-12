import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RadioService } from './radio.service';
import { CreateRadioDto } from './validations/create-radio.dto';
import { UpdateRadioDto } from './validations/update-radio.dto';

@ApiTags('Radio') // Swagger için grup ismi
@Controller('radio')
export class RadioController {
  constructor(private readonly radioService: RadioService) {}

  @Get()
  @ApiOperation({ summary: 'Tüm radyoları getirir' })
  async list() {
    return await this.radioService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID ile radyo bul' })
  @ApiResponse({ status: 200, description: 'Radyo bulundu' })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.radioService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Yeni radyo oluştur' })
  @ApiResponse({ status: 201, description: 'Radyo başarıyla oluşturuldu' })
  async create(@Body() dto: CreateRadioDto) {
    return await this.radioService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Radyo güncelle' })
  @ApiResponse({ status: 200, description: 'Radyo başarıyla güncellendi' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRadioDto,
  ) {
    return await this.radioService.update(dto, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Radyo sil' })
  @ApiResponse({ status: 200, description: 'Radyo başarıyla silindi' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.radioService.delete(id);
  }
}
