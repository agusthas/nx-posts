import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

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

  async remove(id: number) {
    return await this.prismaService.post.delete({
      where: { id },
    });
  }
}
