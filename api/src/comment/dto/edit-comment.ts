import { IsOptional, IsString, MaxLength } from 'class-validator';

export class EditCommentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(3000, {
    message: 'content must be less than 1000 characters',
  })
  content?: string;
}
