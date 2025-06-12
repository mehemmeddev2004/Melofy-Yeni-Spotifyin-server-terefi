import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserEntity } from "src/database/user.entity";

import { UserUpdateDto } from "./validations/update-user.dto";
import * as bcrypt from 'bcrypt';
import { SongEntity } from "src/database/song.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserService {
  private songRepo: Repository<SongEntity>
  private userRepo: Repository<UserEntity>
  constructor(

    @InjectDataSource() private dataSource: DataSource
  ) {
    this.songRepo = this.dataSource.getRepository(SongEntity)
    this.userRepo = this.dataSource.getRepository(UserEntity)

  }

  list() {
    return this.userRepo.find({
      relations: [
        'playlists',
        'likedPlaylists',
        'followedPlaylists',
        'uploadedSongs',
        'likedSongs',
        'likedAlbums',
        'followedArtists', 
        'createdRadioStations',
        'comment',
        'followedRadioStations' 
      ],
    });
  }


  getUser(id: number) {
    return this.userRepo.findOne({ where: { id } })
  }

  async update(id: number, params: UserUpdateDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User is not found");

    if (params.password) {
    const salt = await bcrypt.genSalt();
    params.password = await bcrypt.hash(params.password, salt);
  }

    if (params.email && params.email !== user.email) {
    const existingUser = await this.userRepo.findOne({ where: { email: params.email } });
    if (existingUser && existingUser.id !== id) {
      throw new BadRequestException("please try another email");
    }
  }


  
    Object.assign(user, params);

   
    return await this.userRepo.save(user);
  }


  async delete(id: number) {
    if (!id) throw new BadRequestException("ID must be provided");

    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException("User not found");

    await this.userRepo.delete(id);

    return {
      message: "User deleted successfully"
    };
  }

  async likeSong(userId: number, songId: number) {
    let user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['likedSongs']
    })

    if (!user) throw new NotFoundException("user is not found")

    const song = await this.songRepo.findOne({ where: { id: songId }, relations: ['uploadedBy'] });
    if (!song) throw new NotFoundException("Şarkı bulunamadı");

  
    const alreadyLiked = user.likedSongs.some((s) => s.id === songId);
    if (alreadyLiked) {
      throw new BadRequestException("Şarkıyı zaten beğendiniz.");
    }

  
    user.likedSongs.push(song);
    await this.userRepo.save(user);

    return { message: "Şarkı beğenildi." };

  }


 listPremisions(){
    
 }

async dislikeSong(userId: number, songId: number) {
  const user = await this.userRepo.findOne({
    where: { id: userId },
    relations: ['likedSongs'],
  });
  if (!user) throw new NotFoundException("Kullanıcı bulunamadı");

  const song = await this.songRepo.findOne({ where: { id: songId } });
  if (!song) throw new NotFoundException("Şarkı bulunamadı");


  const index = user.likedSongs.findIndex(s => s.id === songId);
  if (index === -1) {
    throw new BadRequestException("Şarkıyı zaten beğenmiyorsunuz.");
  }

 
  user.likedSongs.splice(index, 1);

  await this.userRepo.save(user);

  return { message: "Şarkı beğenisi kaldırıldı." };
}



}