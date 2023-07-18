import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3000, {
    message: 'content must be less than 3000 characters',
  })
  content: string;

  @IsString()
  @IsNotEmpty()
  tag: string;
}
