import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadedFiles } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Controller('api/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }
  /**
   * 这个 findPerson 的路由要放到 :id 的路由前面，因为 Nest 是从上往下匹配的，如果放在后面，那就匹配到 :id 的路由了
   */
  @Get('findPerson')
  query(@Query('name') name: string, @Query('age') age: number) {
    return this.testService.findOneByQuery(name, age);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }

  @Post('formUrl')
  formUrl(@Body() createTestDto: CreateTestDto) {
    return this.testService.formUrl(createTestDto);
  }

  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      // 设置文件上传的目录
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createTestDto: CreateTestDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.testService.formDataFile(createTestDto, files);
  }
}
