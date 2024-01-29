import { IsInt } from 'class-validator';
export class CreateUserDto {
  name: string;
  @IsInt()
  age: number;
  hobbies: string[];
}
