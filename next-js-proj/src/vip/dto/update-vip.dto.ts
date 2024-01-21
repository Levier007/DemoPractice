import { PartialType } from '@nestjs/mapped-types';
import { CreateVipDto } from './create-vip.dto';

export class UpdateVipDto extends PartialType(CreateVipDto) {}
