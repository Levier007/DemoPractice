import { Injectable } from '@nestjs/common';
import { CreateVipDto } from './dto/create-vip.dto';
import { UpdateVipDto } from './dto/update-vip.dto';

@Injectable()
export class VipService {
  create(createVipDto: CreateVipDto) {
    return 'This action adds a new vip';
  }

  findAll() {
    return `This action returns all vip`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vip`;
  }

  update(id: number, updateVipDto: UpdateVipDto) {
    return `This action updates a #${id} vip`;
  }

  remove(id: number) {
    return `This action removes a #${id} vip`;
  }
}
