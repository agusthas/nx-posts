import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @MinLength(5, { message: 'Title is too short' })
  title: string;

  @IsString()
  @MinLength(10, { message: 'Content is too short' })
  content: string;
}
