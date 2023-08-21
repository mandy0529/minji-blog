import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000, {
    message: 'comment content must be less than 1000 characters',
  })
  content: string;
}
