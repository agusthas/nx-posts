import { Post as PostEntity } from '@prisma/client';

export class Post implements PostEntity {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
