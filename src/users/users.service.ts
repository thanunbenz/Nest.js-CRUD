import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create(createUserDto);
    const toCreate = await this.usersRepository.save(user);
    return toCreate;
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    const tousersUpdate = {
      ...user,
      ...updateUserDto,
    };
    const toUpdate = await this.usersRepository.save(tousersUpdate);
    return toUpdate;
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
