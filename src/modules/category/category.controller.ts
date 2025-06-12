import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { FilterCategoryDto } from "./validations/filtered.category.dto";
import { CreateCategoryDto } from "./validations/create-category.validations";
import { UpdateCategoryDto } from "./validations/update-category.validations";

@Controller('category')
export class CategoryController{
constructor(
    private CategoryService: CategoryService
){}
@Get()
list(){
    return this.CategoryService.list()
}

@Get('filter')
async filterCategories(@Query() dto: FilterCategoryDto) {
  return await this.CategoryService.filter(dto);
}

@Get(':id')
findbyId(@Param('id') id:number ){
    return this.CategoryService.findbyId(id)
}

@Post()
async create(@Body() body: CreateCategoryDto){
    return this.CategoryService.create(body)
}

@Put(':id') 
async update(
  @Param('id') id: number,
  @Body() body: UpdateCategoryDto
) {
  return this.CategoryService.update(id, body);
}

@Delete(':id')
async delete(@Param('id') id:number){
return this.CategoryService.delete(id)
}

}