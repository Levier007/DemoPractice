import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value.age);

    if (Number.isNaN(parseInt(value.age))) {
      throw new BadRequestException(`age参数错误`);
    }
    return typeof value.age === 'number' ? value.age : +value.age;
  }
}
