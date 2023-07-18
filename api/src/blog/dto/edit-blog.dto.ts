import { IsOptional, IsString, MaxLength } from 'class-validator';

export class EditBlogDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(3000, {
    message: 'content must be less than 3000 characters',
  })
  content?: string;

  @IsString()
  @IsOptional()
  tag?: string;
}
