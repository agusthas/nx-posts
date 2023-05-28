import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const { title, content } = createPostDto;
    const post = await this.prismaService.post.create({
      data: {
        title,
        content,
      },
    });

    return post;
  }

  async findAll() {
    return await this.prismaService.post.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.post.findUnique({
      where: { id },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
