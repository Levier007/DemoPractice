import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import * as fs from 'fs';

@Injectable()
export class TestService {
  create(createTestDto: CreateTestDto) {
    return 'This action adds a new test';
  }

  findAll() {
    return `This action returns all test`;
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
  /* ======新增======= */
  findOneByQuery(name: string, age: number) {
    return `received: name=${name},age=${age}`;
  }
  // 创建资源-返回201状态码
  formUrl(createTestDto: CreateTestDto) {
    return `received: ${JSON.stringify(createTestDto)}`;
  }

  formDataFile(
    createTestDto: CreateTestDto,
    files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return `received: ${JSON.stringify(createTestDto)}`;
  }
}
