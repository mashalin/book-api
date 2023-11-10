import { IsInt, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Should be a string' })
  readonly name: string;

  @IsString({ message: 'Should be a string' })
  readonly author: string;

  @IsInt()
  readonly yearOfPublishing: number;

  @IsString({ message: 'Should be a string' })
  readonly description: string;
}
