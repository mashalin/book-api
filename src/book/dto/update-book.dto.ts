import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly name?: string;

  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly author?: string;

  @IsInt()
  @IsOptional()
  readonly yearOfPublishing?: number;

  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly description?: string;
}
